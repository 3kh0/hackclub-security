import { pg } from '../utils/db';
import { email } from '../utils/email';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const verify = await verifyTurnstile(body.turnstileToken, config.tprivate);
  if (!verify.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "CAPTCHA verification failed. Please try again.",
    });
  }

  const { 
    name,
    email: userEmail, // Renamed to avoid conflict
    region,
    affectedPrograms,
    title, 
    description, 
    cvssScore,
    severity
  } = body;

  if (!title || !description || !userEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, description, and email are required'
    });
  }

  // Generate unique report ID
  const reportId = `SEC-${Date.now()}`;

  try {
    // Ensure table exists (matching original schema)
    await pg.query(`CREATE TABLE IF NOT EXISTS reports (
      id VARCHAR PRIMARY KEY,
      timestamp TIMESTAMP,
      name VARCHAR,
      email VARCHAR,
      region VARCHAR,
      affected_programs TEXT[],
      title VARCHAR,
      description TEXT,
      cvss_score FLOAT,
      severity VARCHAR,
      status VARCHAR DEFAULT 'open',
      allowed_emails TEXT[]
    )`);

    // Insert report into database
    await pg.query(
      `INSERT INTO reports (id, timestamp, name, email, region, affected_programs, title, description, cvss_score, severity, status, allowed_emails)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [reportId, new Date().toISOString(), name, userEmail, region, affectedPrograms, title, description, cvssScore, severity, 'open', [userEmail]]
    );

    // Send confirmation email to reporter
    await email(
      userEmail,
      `**Thank you for submitting your report to the Hack Club Security program.**\n\nYour report ID is **${reportId}**.\n\nWe will send any updates to your email address, including if we need further information regarding your submission, or when your report has been resolved.\n\nThank you for helping us keep Hack Club secure!`
    );

    return {
      success: true,
      reportId,
      message: "Report submitted successfully"
    };
  } catch (error) {
    console.error('Error submitting report:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit report'
    });
  }
});

async function verifyTurnstile(token: string, key: string): Promise<{ success: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "HackClub-Security/1.0",
      },
      body: new URLSearchParams({
        secret: key,
        response: token,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) {
      return { success: false };
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile error:", error);
    return { success: false };
  }
}
