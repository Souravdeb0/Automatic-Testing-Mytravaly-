import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://mtindia-v2-admin.onrender.com';
const jsonReportName = process.env.JSON_REPORT_NAME ?? 'all-tests';

export default defineConfig({
  testDir: '.',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
    ['json', { outputFile: `reports/json/${jsonReportName}.json` }],
  ],
  use: {
    baseURL,
    headless: process.env.HEADLESS !== '0',
    viewport: { width: 1440, height: 1000 },
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'unit',
      testMatch: /tests-unit\/.*\.spec\.ts/,
    },
    {
      name: 'integration',
      testMatch: /tests-integration\/.*\.spec\.ts/,
    },
    {
      name: 'chromium',
      testMatch: /tests-ts\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'reports/test-results',
});
