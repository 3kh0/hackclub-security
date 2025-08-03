import { pg } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const id = event.context.params.id
  const { rows } = await pg.query('SELECT * FROM reports WHERE id = $1', [id])
  if (!rows.length) {
    throw createError({ statusCode: 404 })
  }
  return rows[0]
})
