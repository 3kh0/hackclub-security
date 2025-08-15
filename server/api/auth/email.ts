import { pg } from '~/server/utils/db';
import { email } from '~/server/utils/email';

export default defineEventHandler(async (event) => {
  const { email: userEmail } = await readBody(event);
  
  if (!userEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    });
  }

  // Check if user exists in database
  const user = await pg.query('SELECT id FROM users WHERE email = $1', [userEmail]);
  
  if (!user.rows.length) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }

  // Generate verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Store code in database
  await pg.query(
    'INSERT INTO verification_codes (email, code, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET code = $2, expires_at = $3, attempts = 0',
    [userEmail, code, expiresAt]
  );

  // Send email with code
  await email(userEmail, `Your verification code is: ${code}`);

  return { success: true };
});
