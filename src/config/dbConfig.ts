import fs from "fs";
import path from "path";

export type DbConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  schema: string;
  useTestcontainers: boolean;
};

function parseProperties(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    result[key] = rest.join("=");
  }
  return result;
}

export function loadDbConfig(): DbConfig {
  const propsPath = path.resolve(process.cwd(), "config", "db.properties");
  const props = fs.existsSync(propsPath)
    ? parseProperties(fs.readFileSync(propsPath, "utf-8"))
    : {};

  const host = process.env.DB_HOST ?? props.DB_HOST ?? "localhost";
  const port = Number(process.env.DB_PORT ?? props.DB_PORT ?? "5432");
  const database = process.env.DB_NAME ?? props.DB_NAME ?? "api_tests";
  const user = process.env.DB_USER ?? props.DB_USER ?? "postgres";
  const password = process.env.DB_PASSWORD ?? props.DB_PASSWORD ?? "postgres";
  const schema = process.env.DB_SCHEMA ?? props.DB_SCHEMA ?? "public";
  const useTestcontainers =
    (process.env.USE_TESTCONTAINERS ?? props.USE_TESTCONTAINERS) === "true";

  return { host, port, database, user, password, schema, useTestcontainers };
}
