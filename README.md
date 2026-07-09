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

Run only one test layer:

```bash
pnpm run test:unit
pnpm run test:integration
pnpm run test:e2e
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

## Test Layers

- Unit tests: pure TypeScript checks for shared config and helper functions.
- Integration tests: HTTP-level checks against the deployed application routes.
- E2E tests: browser UI checks for the public landing page workflows.
