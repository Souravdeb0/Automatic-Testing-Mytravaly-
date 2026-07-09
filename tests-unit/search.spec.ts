import { expect, test } from '@playwright/test';
import { buildSearchResultsPath, isSearchButtonDisabledClass } from '../src/utils/search';

test.describe('unit: search helpers', () => {
  test('builds encoded search result URLs from a location', () => {
    expect(buildSearchResultsPath('Goa')).toBe('/search-results?location=Goa');
    expect(buildSearchResultsPath('New Delhi')).toBe('/search-results?location=New%20Delhi');
  });

  test('detects disabled search button classes', () => {
    expect(isSearchButtonDisabledClass('bg-gray-400 cursor-not-allowed')).toBe(true);
    expect(isSearchButtonDisabledClass('bg-cta cursor-pointer')).toBe(false);
    expect(isSearchButtonDisabledClass(null)).toBe(false);
  });
});

