import { Client } from 'pg'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const method = event.method
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT)
  })
  await client.connect()

  if (method === 'GET') {
    const { rows } = await client.query('SELECT * FROM reports WHERE id = $1', [id])
    await client.end()
    if (rows.length === 0) {
      return { error: 'Report not found' }
    }
    return rows[0]
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.status) {
      await client.end()
      return { error: 'Missing status' }
    }
    await client.query('UPDATE reports SET status = $1 WHERE id = $2', [body.status, id])
    await client.end()
    return { success: true }
  }

  await client.end()
  return { error: 'Invalid method' }
})
