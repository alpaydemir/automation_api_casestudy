import { startPostgresIfNeeded, stopPostgresIfStarted } from "../src/db/postgresContainer";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  await startPostgresIfNeeded();

  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_PORT:", process.env.DB_PORT);
  console.log("DB_NAME:", process.env.DB_NAME);
  console.log("DB_USER:", process.env.DB_USER);

  
  await sleep(30000);

  await stopPostgresIfStarted();
})();
