import { z } from 'zod'
import { pg } from '../../utils/db'
import { shot } from '../../utils/opt'

const bodySchema = z.object({
  email: z.string().email()
})

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse)
  const look = await pg.query('SELECT email FROM users WHERE email = $1', [email])
  if (!look.rows.length) {
    return {}
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  await pg.query('INSERT INTO otp (email, code, created_at, attempts) VALUES ($1, $2, NOW(), 0)', [email, code])
  await shot(email, code, process.env.RESEND_API_KEY)
  return {}
})
