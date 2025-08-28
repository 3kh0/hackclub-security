import { z } from 'zod'
import { pg } from '../../utils/db'
import { shot } from '../../utils/opt'

const bodySchema = z.object({
  email: z.string().email(),
  r: z.string().nullable().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)
  const email = body.email
  const secId = body.r ? body.r.trim().split('/report/').pop() : undefined

  if (secId) {
    const reportRes = await pg.query('SELECT allowed_emails, email FROM reports WHERE id = $1', [secId])
    if (!reportRes.rows.length) {
      return {}
    }
    const report = reportRes.rows[0]
    let a = []
    if (typeof report.allowed_emails === 'string') {
      a = report.allowed_emails.replace(/[{}]/g, '').split(',').map(e => e.trim()).filter(Boolean)
    } else if (Array.isArray(report.allowed_emails)) {
      a = report.allowed_emails
    }
    if (!(a.includes(email) || report.email === email)) {
      return {}
    }
  } else {
    const look = await pg.query('SELECT email FROM users WHERE email = $1', [email])
    if (!look.rows.length) {
      return {}
    }
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  await pg.query('INSERT INTO otp (email, code, created_at, attempts) VALUES ($1, $2, NOW(), 0)', [email, code])
  await shot(email, code, process.env.RESEND_API_KEY)
  return {}
})
