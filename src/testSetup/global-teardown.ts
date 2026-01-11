import { closePool } from "../db/db";
import { stopPostgresIfStarted } from "../db/postgresContainer";

export default async function globalTeardown() {
  await closePool();
  await stopPostgresIfStarted();
}
