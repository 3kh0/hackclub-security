import jwt from 'jsonwebtoken';
import { pg } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  const { email, code } = await readBody(event);
  
  if (!email || !code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and code are required'
    });
  }

  // Check rate limits and validate code
  const result = await pg.query(
    'SELECT code, expires_at, attempts FROM verification_codes WHERE email = $1',
    [email]
  );

  if (!result.rows.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No verification code found'
    });
  }

  const { code: storedCode, expires_at, attempts } = result.rows[0];

  // Rate limiting - max 5 attempts
  if (attempts >= 5) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many attempts. Request a new code.'
    });
  }

  // Check if code expired
  if (new Date() > new Date(expires_at)) {
    throw createError({
      statusCode: 410,
      statusMessage: 'Verification code expired'
    });
  }

  // Increment attempts
  await pg.query(
    'UPDATE verification_codes SET attempts = attempts + 1 WHERE email = $1',
    [email]
  );

  // Validate code
  if (code !== storedCode) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid verification code'
    });
  }

  // Clear the verification code
  await pg.query('DELETE FROM verification_codes WHERE email = $1', [email]);

  // Create session/JWT token
  const user = await pg.query('SELECT id, email FROM users WHERE email = $1', [email]);
  const token = jwt.sign({ userId: user.rows[0].id, email }, process.env.JWT_SECRET!, { 
    expiresIn: '7d' 
  });

  setCookie(event, 'auth-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });

  return { success: true, user: user.rows[0] };
});
