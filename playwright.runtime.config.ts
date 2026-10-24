import { defineConfig } from "@playwright/test";

// Exercise Vercel's actual routing as well as Vite. Frontend-only tests cannot
// detect a server rewrite intercepting one of the browser's module imports.
export default defineConfig({
  testDir: "tests/runtime",
  workers: 1,
  use: { baseURL: "http://localhost:8080", trace: "retain-on-failure" },
  webServer: {
    command: "bun run dev",
    url: "http://localhost:8080/api/posh/registration",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
