import { pg } from '../../../utils/db'
import { z } from 'zod'

const bodySchema = z.object({ status: z.string() })

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const id = event.context.params.id
  const { status } = await readValidatedBody(event, bodySchema.parse)
  await pg.query('UPDATE reports SET status = $1 WHERE id = $2', [status, id])
  return { success: true }
})
