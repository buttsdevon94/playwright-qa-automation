import { login } from '../helpers/login';
import { test, expect } from '@playwright/test';

test('user can log in with valid credentials', async ({ page }) => {

  await login(
  page,
  process.env.TEST_USERNAME!,
  process.env.TEST_PASSWORD!
  );

  await expect(page).toHaveURL(/inventory\.html/);

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

});

test('user sees an error message with invalid credentials', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('invalid_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Username and password do not match')
  ).toBeVisible();
});

test('user sees an error when username is empty', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Username is required')
  ).toBeVisible();
});