import { startPostgresIfNeeded } from "../db/postgresContainer";
import { ensureSchemaAndTables } from "../db/migrations";

export default async function globalSetup() {
  await startPostgresIfNeeded();
  await ensureSchemaAndTables();
}
