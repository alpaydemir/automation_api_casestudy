import { Pool } from "pg";
import { loadDbConfig } from "../config/dbConfig";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;

  const cfg = loadDbConfig();
  pool = new Pool({
    host: cfg.host,
    port: cfg.port,
    database: cfg.database,
    user: cfg.user,
    password: cfg.password,
    max: 5,
  });

  return pool;
}

export async function closePool(): Promise<void> {
  if (!pool) return;
  await pool.end();
  pool = null;
}
