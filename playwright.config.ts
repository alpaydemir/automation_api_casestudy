import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30 * 1000,

  globalSetup: require.resolve("./src/testSetup/global-setup"),
  globalTeardown: require.resolve("./src/testSetup/global-teardown"),

  reporter: [["html", { open: "never" }]],
});
