import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly backpackItem: Locator;

  constructor(page: Page) {
    this.page = page;

    this.backpackItem = page.getByText(
      'Sauce Labs Backpack',
      { exact: true }
    );
  }
}