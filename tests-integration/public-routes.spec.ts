import { expect, test } from '@playwright/test';

test.describe('integration: deployed public routes', () => {
  test('landing page is reachable', async ({ request, baseURL }) => {
    const response = await request.get(baseURL ?? '/');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

  test('internal application routes are not publicly exposed', async ({ request, baseURL }) => {
    for (const route of ['/login', '/admin', '/dashboard']) {
      const response = await request.head(`${baseURL}${route}`);
      expect(response.status(), `${route} should return 404`).toBe(404);
    }
  });
});

