# MTIndia Admin Automation Testing Module

This workspace contains a TypeScript + Playwright automation module for:

https://mtindia-v2-admin.onrender.com/

The suite follows the Page Object Model structure described in `Automation Testing Summary Report.docx`.

## Project Structure

```text
src/
  config.ts
  pages/
    AdminModulePage.ts
tests-ts/
  admin-module.spec.ts
reports/
package.json
playwright.config.ts
tsconfig.json
```

## Setup

```bash
pnpm install
pnpm exec playwright install chromium
```

## Run Tests

Headless mode is enabled by default.

```bash
pnpm test
```

Run visibly:

```bash
pnpm run test:headed
```

Reports are generated automatically after each run:

- HTML report: `reports/playwright-report`
- JSON report: `reports/test-results/results.json`

## Useful Environment Variables

- `BASE_URL`: target application URL. Defaults to `https://mtindia-v2-admin.onrender.com`
- `HEADLESS`: set `0` to run Chrome visibly.
