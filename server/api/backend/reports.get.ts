import { pg } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  let rows
  if (user.role === 'admin') {
    const result = await pg.query("SELECT * FROM reports ORDER BY timestamp DESC")
    rows = result.rows
  } else {
    const result = await pg.query("SELECT * FROM reports WHERE $1 = ANY(allowed_emails) OR email = $1 ORDER BY timestamp DESC", [user.email])
    rows = result.rows
  }
  return rows
})
