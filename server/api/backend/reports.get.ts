import { pg } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { rows } = await pg.query("SELECT * FROM reports ORDER BY timestamp DESC")
  return rows
})
