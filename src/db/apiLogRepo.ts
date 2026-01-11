import { getPool } from "./db";
import { loadDbConfig } from "../config/dbConfig";

export type ApiLog = {
  testName: string;
  method: string;
  url: string;
  requestHeaders?: any;
  requestBody?: any;
  statusCode?: number;
  responseHeaders?: any;
  responseBody?: any;
};

export async function insertApiLog(log: ApiLog): Promise<void> {
  const pool = getPool();
  const cfg = loadDbConfig();

  await pool.query(
    `
    INSERT INTO "${cfg.schema}"."api_logs"
      (test_name, method, url, request_headers, request_body, status_code, response_headers, response_body)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      log.testName,
      log.method,
      log.url,
      log.requestHeaders ?? null,
      log.requestBody ?? null,
      log.statusCode ?? null,
      log.responseHeaders ?? null,
      log.responseBody ?? null,
    ]
  );
}
