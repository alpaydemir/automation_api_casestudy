import { getPool } from "./db";
import { loadDbConfig } from "../config/dbConfig";

export async function ensureSchemaAndTables(): Promise<void> {
  const pool = getPool();
  const cfg = loadDbConfig();

  if (cfg.schema && cfg.schema !== "public") {
    await pool.query(`CREATE SCHEMA IF NOT EXISTS "${cfg.schema}"`);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "${cfg.schema}"."api_logs" (
      id BIGSERIAL PRIMARY KEY,
      test_name TEXT NOT NULL,
      method TEXT NOT NULL,
      url TEXT NOT NULL,
      request_headers JSONB,
      request_body JSONB,
      status_code INT,
      response_headers JSONB,
      response_body JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}
