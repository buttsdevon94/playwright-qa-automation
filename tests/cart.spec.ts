import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
  await login(
    page,
    process.env.TEST_USERNAME!,
    process.env.TEST_PASSWORD!
  );

  await expect(page).toHaveURL(/inventory\.html/);
});

test('user can add a product to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addFirstProductToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);

  await expect(cartPage.backpackItem).toBeVisible();
});