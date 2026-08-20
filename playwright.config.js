import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";
const includeWebKit = Boolean(process.env.CI) || process.env.PLAYWRIGHT_WEBKIT === "1";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 8_000 },
  outputDir: "review/technical-audit/playwright-results",
  reporter: [
    ["line"],
    ["html", { outputFolder: "review/technical-audit/playwright-report", open: "never" }],
  ],
  use: {
    baseURL,
    colorScheme: "light",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    ...(includeWebKit ? [{ name: "webkit", use: { ...devices["Desktop Safari"] } }] : []),
  ],
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3000",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
