import { Client } from "pg";
import { sendEmail } from "../utils/email/submit";

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

  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
  });
  await client.connect();

  // Ensure table exists
  await client.query(`CREATE TABLE IF NOT EXISTS reports (
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

  // Build submission
  const submission = {
    timestamp: new Date().toISOString(),
    id: `SEC-${Date.now()}`,
    name: body.name,
    email: body.email,
    region: body.region,
    affectedPrograms: body.affectedPrograms,
    title: body.title,
    description: body.description,
    cvssScore: body.cvssScore,
    severity: body.severity,
    status: 'open',
    allowedEmails: [body.email] // reporter always included
  };

  let dbSuccess = false;
  try {
    await client.query(
      `INSERT INTO reports (id, timestamp, name, email, region, affected_programs, title, description, cvss_score, severity, status, allowed_emails)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [submission.id, submission.timestamp, submission.name, submission.email, submission.region, submission.affectedPrograms, submission.title, submission.description, submission.cvssScore, submission.severity, submission.status, submission.allowedEmails],
    );
    dbSuccess = true;
    await client.end();
  } catch (err) {
    console.error("DB insert error:", err);
  }

  if (dbSuccess) {
    await sendEmail(submission.email, submission.id);
  }

  return {
    success: dbSuccess,
    id: submission.id,
  };
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

// No admin-specific logic needed for report submission, as anyone can submit.
