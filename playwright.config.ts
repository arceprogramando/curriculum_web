import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
const BASE = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: BASE,
    locale: 'es-AR',
    colorScheme: 'light',
    // 1080p + scale 2 → video más nítido que 1440×900
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
    trace: 'off',
    screenshot: 'only-on-failure',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 },
    },
    launchOptions: {
      slowMo: 260,
    },
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${PORT}`,
    url: `${BASE}/crear-cv/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
