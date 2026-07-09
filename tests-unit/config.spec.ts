import { expect, test } from '@playwright/test';
import { BASE_URL, categoryNames } from '../src/config';

test.describe('unit: shared config', () => {
  test('base URL defaults to the deployed MTIndia admin URL', () => {
    expect(BASE_URL).toBe('https://mtindia-v2-admin.onrender.com');
  });

  test('property category list contains the supported landing page tabs', () => {
    expect(categoryNames).toEqual(['Hotels', 'Resorts', 'Home Stays', 'Camps & Tents']);
  });
});

