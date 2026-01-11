import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { loadDbConfig } from "../config/dbConfig";

let container: StartedPostgreSqlContainer | null = null;

export async function startPostgresIfNeeded(): Promise<void> {
  const cfg = loadDbConfig();

  if (!cfg.useTestcontainers) return;
  if (container) return;

  const pgContainer = new PostgreSqlContainer("postgres:16-alpine")
    .withDatabase(cfg.database)
    .withUsername(cfg.user)
    .withPassword(cfg.password);

  container = await pgContainer.start();

  process.env.DB_HOST = container.getHost();
  process.env.DB_PORT = container.getPort().toString();
  process.env.DB_NAME = container.getDatabase();
  process.env.DB_USER = container.getUsername();
  process.env.DB_PASSWORD = container.getPassword();
}

export async function stopPostgresIfStarted(): Promise<void> {
  if (!container) return;
  await container.stop();
  container = null;
}
