import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: false, workers: 1, timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:4178/kurs/web/', browserName: 'chromium', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: { command: 'node scripts/serve-dist.mjs', url: 'http://127.0.0.1:4178/kurs/web/', reuseExistingServer: !process.env.CI }
});
