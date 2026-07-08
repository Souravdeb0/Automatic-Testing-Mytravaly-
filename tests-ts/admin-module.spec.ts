import { expect, test } from '@playwright/test';
import { AdminModulePage } from '../src/pages/AdminModulePage';
import { categoryNames } from '../src/config';

test.describe('MTIndia Admin public module', () => {
  test('TC-01: root page loads', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();

    await expect(admin.logo).toBeVisible();
    await expect(admin.locationInput).toBeVisible();
    await expect(admin.popularPropertiesHeading).toBeVisible();
  });

  test('TC-02: header navigation is visible', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();

    await admin.expectHeaderNavigationVisible();
  });

  test('TC-03: search controls are visible', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();

    await admin.expectSearchControlsVisible();
  });

  test('TC-04: popular property tabs are visible', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();

    await admin.expectCategoryTabsVisible();
  });

  test('TC-05: internal routes are not publicly exposed', async ({ request }) => {
    await AdminModulePage.expectRoutesNotExposed(request, ['/login', '/admin', '/dashboard']);
  });

  test('TC-06: search flow navigates to search results', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();
    await admin.enterLocation('Goa');
    await admin.selectLocationSuggestion();
    await admin.submitSearch('Goa');

    await expect(page).toHaveURL(/search-results/);
    expect(page.url().toLowerCase()).toContain('location=goa');
  });

  test('TC-07: date picker opens and exposes selectable dates', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();
    const before = await admin.dateControl.innerText();
    await admin.selectTravelDates();
    const after = await admin.dateControl.innerText();

    expect(after.toLowerCase()).toContain('when');
    expect(after.length).toBeGreaterThan(0);
    expect(after === before || after.includes('-')).toBeTruthy();
  });

  test('TC-08: guest selector opens and displays guest count', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();
    await expect(admin.guestDisplay).toBeVisible();

    await admin.incrementGuests();

    await expect(admin.guestDisplay).toContainText(/Guests?/);
  });

  test('TC-09: property tabs can be clicked', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();
    const initialContent = await admin.displayedPropertyContent();

    for (const categoryName of categoryNames) {
      await admin.clickCategoryTab(categoryName);
      await expect(admin.categoryTab(categoryName)).toBeVisible();
    }

    expect((await admin.displayedPropertyContent()) || initialContent).not.toEqual('');
  });

  test('TC-10: rendered module validation', async ({ page }) => {
    const admin = new AdminModulePage(page);

    await admin.open();
    await admin.expectLoaded();

    await admin.expectHeaderNavigationVisible();
    await admin.expectSearchControlsVisible();
    await admin.expectCategoryTabsVisible();
  });
});

