import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addToCartButtons = page.getByRole('button', {
      name: 'Add to cart',
    });

    this.cartBadge = page.locator('.shopping_cart_badge');

    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}