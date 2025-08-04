import { pg } from '../../../utils/db'
import { z } from 'zod'
import { sendReportInvite } from '../../../utils/email'

const bodySchema = z.object({ status: z.string().optional(), allowed_emails: z.array(z.string()).optional() })

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const id = event.context.params.id
  const body = await readValidatedBody(event, bodySchema.parse)
  // Fetch current allowed_emails
  const { rows } = await pg.query('SELECT allowed_emails FROM reports WHERE id = $1', [id])
  const currentEmails = rows[0]?.allowed_emails || []
  if (body.allowed_emails) {
    if (user.role !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Admins only'})
    }
    await pg.query('UPDATE reports SET allowed_emails = $1 WHERE id = $2', [body.allowed_emails, id])
    // Find newly added emails
    const newEmails = body.allowed_emails.filter(e => !currentEmails.includes(e))
    for (const email of newEmails) {
      // Send invite with redirect to sign-in and then report
      await sendReportInvite(email, id, process.env.BASE_URL || 'https://security.hackclub.com', process.env.RESEND_API_KEY)
    }
  }
  if (body.status) {
    if (user.role !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Admins only'})
    }
    await pg.query('UPDATE reports SET status = $1 WHERE id = $2', [body.status, id])
  }
  return { success: true }
})
