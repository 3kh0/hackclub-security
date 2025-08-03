import { z } from 'zod'
import { pg } from '../../utils/db'

const bodySchema = z.object({
  email: z.string().email(),
  code: z.number().min(100000).max(999999)
})

export default defineEventHandler(async (event) => {
  try {
    const { email, code } = await readValidatedBody(event, bodySchema.parse)
    const look = await pg.query('SELECT * FROM otp WHERE email = $1 AND code = $2', [email, code])
    if (!look.rows.length) {
      await pg.query('UPDATE otp SET attempts = attempts + 1 WHERE email = $1 AND code = $2', [email, code])
      return {}
    }
    const otp = look.rows[0]
    const age = new Date() - new Date(otp.created_at)
    if (age > 10 * 60 * 1000) {
      return {}
    }
    if (otp.attempts > 3) {
      return {}
    }
    await setUserSession(event, { user: { email } })
    await pg.query('DELETE FROM otp WHERE email = $1', [email])
    return {}
  } catch {
    return {}
  }
})
