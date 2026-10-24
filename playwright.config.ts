import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:8081", trace: "retain-on-failure" },
  projects: [
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "bun run dev:frontend --host 127.0.0.1 --port 8081",
    url: "http://127.0.0.1:8081",
    reuseExistingServer: !process.env.CI,
  },
});
