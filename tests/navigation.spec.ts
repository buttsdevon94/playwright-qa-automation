import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  await login(
    page,
    process.env.TEST_USERNAME!,
    process.env.TEST_PASSWORD!
  );

  await expect(page).toHaveURL(/inventory\.html/);
});

test('user can navigate from inventory to cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);
});

test('user can view inventory page after login', async ({ page }) => {
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});