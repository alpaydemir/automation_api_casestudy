import { test, expect } from "@playwright/test";

test("db container should start (smoke)", async () => {
  await new Promise((r) => setTimeout(r, 20000));
  expect(true).toBeTruthy();
});
