import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 2,
  reporter: "html",
  expect: { timeout: 15_000 },
  use: { baseURL: "http://127.0.0.1:4174", trace: "on-first-retry" },
  webServer: {
    command: "npm run dev -- --port 4174",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
});
