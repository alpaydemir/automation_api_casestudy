import { test, expect } from "@playwright/test";
import { authService } from "../services/auth.service";

test("login @smoke @regression", async () => {
  const response = await authService.login("emilys", "emilyspass");

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token ?? body.accessToken).toBeDefined();
});
