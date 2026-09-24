import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!connectionString) throw new Error("DATABASE_URL or POSTGRES_URL is required.");

const migration = await readFile("db/001_posh_registrations.sql", "utf8");
const statements = migration
  .split(";")
  .map((statement) => statement.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

const sql = neon(connectionString);
await sql.transaction(statements.map((statement) => sql.query(statement)));

console.log(`Applied ${statements.length} Neon migration statements.`);
