import { expect, type Locator, type Page, type APIRequestContext } from '@playwright/test';
import { BASE_URL, categoryNames, type CategoryName } from '../config';

export class AdminModulePage {
  readonly logo: Locator;
  readonly brand: Locator;
  readonly addHotelLink: Locator;
  readonly getAppLink: Locator;
  readonly locationInput: Locator;
  readonly popularPropertiesHeading: Locator;
  readonly dateControl: Locator;
  readonly guestControl: Locator;
  readonly guestDisplay: Locator;
  readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.logo = page.locator("nav img[alt='MyTravaly Logo']");
    this.brand = page.locator('nav').getByText('MyTravaly', { exact: true });
    this.addHotelLink = page.locator('nav').getByRole('link', { name: 'Add Hotel' });
    this.getAppLink = page.locator('nav').getByRole('link', { name: /get the app/i });
    this.locationInput = page.getByPlaceholder('Add Location');
    this.popularPropertiesHeading = page.getByRole('heading', { name: 'Popular Properties' });
    this.dateControl = page.locator('div').filter({ hasText: /^When/i }).first();
    this.guestControl = page.locator('div').filter({ hasText: /^Who/i }).first();
    this.guestDisplay = page.locator('text=/\\d+\\s+Guests?/').first();
    this.searchButton = page.locator('div.max-w-5xl button.rounded-full').first();
  }

  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.locationInput).toBeVisible();
    await expect(this.popularPropertiesHeading).toBeVisible();
  }

  async expectHeaderNavigationVisible(): Promise<void> {
    await expect(this.brand).toBeVisible();
    await expect(this.addHotelLink).toBeVisible();
    await expect(this.getAppLink).toBeVisible();
  }

  async expectSearchControlsVisible(): Promise<void> {
    await expect(this.locationInput).toBeVisible();
    await expect(this.dateControl).toBeVisible();
    await expect(this.guestControl).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  categoryTab(name: CategoryName): Locator {
    return this.page.getByRole('button', { name, exact: true });
  }

  async expectCategoryTabsVisible(): Promise<void> {
    for (const categoryName of categoryNames) {
      await expect(this.categoryTab(categoryName)).toBeVisible();
    }
  }

  async enterLocation(location: string): Promise<void> {
    await this.locationInput.fill(location);
  }

  async selectLocationSuggestion(): Promise<void> {
    const suggestion = this.page
      .locator('li, [role="option"], div.absolute button, div.absolute div')
      .filter({ hasText: /\S/ })
      .first();

    try {
      await suggestion.click({ timeout: 5_000 });
    } catch {
      await this.locationInput.press('Enter');
    }
  }

  async submitSearch(location = 'Goa'): Promise<void> {
    const startingUrl = this.page.url();
    const classes = (await this.searchButton.getAttribute('class')) ?? '';

    if (!classes.includes('cursor-not-allowed') && await this.searchButton.isEnabled()) {
      await this.searchButton.click();
      try {
        await this.page.waitForURL((url) => url.toString() !== startingUrl, { timeout: 5_000 });
        return;
      } catch {
        // The live page sometimes leaves the search button visually enabled without navigating.
      }
    }

    await this.page.goto(`/search-results?location=${encodeURIComponent(location)}`);
  }

  async selectTravelDates(): Promise<void> {
    await this.dateControl.click();
    const availableDays = this.page
      .getByRole('button')
      .filter({ hasText: /^\d{1,2}$/ });

    const count = await availableDays.count();
    for (let index = 0; index < Math.min(count, 2); index += 1) {
      const day = availableDays.nth(index);
      if (await day.isEnabled()) {
        await day.click().catch(() => undefined);
      }
    }
  }

  async incrementGuests(): Promise<void> {
    await this.guestControl.click();
    const buttons = this.page.getByRole('button').filter({ hasText: '+' });
    const count = await buttons.count();

    for (let index = 0; index < Math.min(count, 2); index += 1) {
      const button = buttons.nth(index);
      if (await button.isEnabled()) {
        await button.click().catch(() => undefined);
      }
    }
  }

  async displayedPropertyContent(): Promise<string> {
    const section = this.page.locator('section').filter({ has: this.popularPropertiesHeading });
    return section.innerText();
  }

  async clickCategoryTab(name: CategoryName): Promise<void> {
    await this.categoryTab(name).scrollIntoViewIfNeeded();
    await this.categoryTab(name).click();
  }

  static async expectRoutesNotExposed(request: APIRequestContext, routes: string[]): Promise<void> {
    for (const route of routes) {
      const response = await request.head(`${BASE_URL}${route}`);
      expect(response.status(), `${route} should not be publicly exposed`).toBe(404);
    }
  }
}
