import { Client } from "pg";

export default defineEventHandler(async (event) => {
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
  });
  await client.connect();
  const { rows } = await client.query("SELECT * FROM reports ORDER BY timestamp DESC");
  await client.end();
  return rows;
});
