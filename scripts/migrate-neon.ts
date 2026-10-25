import { readFile, readdir } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";
import { sqlStatements } from "./sql-statements.js";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!connectionString)
  throw new Error("DATABASE_URL or POSTGRES_URL is required.");

const sql = neon(connectionString);
await sql`CREATE TABLE IF NOT EXISTS posh_schema_migrations(name text PRIMARY KEY,applied_at timestamptz NOT NULL DEFAULT now())`;
for (const name of (await readdir("db"))
  .filter((n) => n.endsWith(".sql"))
  .sort()) {
  if (
    (await sql`SELECT name FROM posh_schema_migrations WHERE name=${name}`)
      .length
  )
    continue;
  const statements = sqlStatements(await readFile(`db/${name}`, "utf8"));
  await sql.transaction([
    ...statements.map((statement) => sql.query(statement)),
    sql`INSERT INTO posh_schema_migrations(name) VALUES(${name})`,
  ]);
  console.log(`Applied ${name} (${statements.length} statements).`);
}
