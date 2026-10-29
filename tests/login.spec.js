
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
 

test.describe("Testing Login page that requires a login", () => {
  let Login;
  test.beforeEach(async ({ page }) => {
    Login = new LoginPage(page);
    await Login.gotoLoginPage();
  });

  test('TC-L01 - Valid login (standard)', async ({ page }) => {
    await Login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-L02 - Locked-out user', async ({ page }) => {
    await Login.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).
      toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC-L03 - Empty username and password', async ({ page }) => {
    await Login.login('', '');
    await expect(page.locator('[data-test="error"]')).
      toContainText('Epic sadface: Username is required');
  });

  test('TC-L04 - Empty password', async ({ page }) => {
    await Login.login('standard_user', '');
    await expect(page.locator('[data-test="error"]')).
      toContainText('Epic sadface: Password is required');
  });

  test('TC-L05 - Wrong username', async ({ page }) => {
    await Login.login('wrong_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).
      toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-L06 - Wrong password', async ({ page }) => {
    await Login.login('standard_user', 'wrong_pass');
    await expect(page.locator('[data-test="error"]')).
      toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-L07 - Case sensitivity', async ({ page }) => {
    await Login.login('STANDARD_USER', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).
      toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('TC-L08 - Error banner can be closed', async ({ page }) => {
    await Login.login('STANDARD_USER', 'secret_sauce');
    await page.locator('[data-test="error-button"]').click();
    await expect(page.locator('.error-message-container')).toHaveText('');
  });

  test('TC-L09 - Password masking', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    //await page.getByRole('textbox', {name : 'Password'}).toHaveAttribute('type', 'password')
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

});

test('TC-L10 - Direct URL access without login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveURL('https://www.saucedemo.com');

  await expect(page.locator('[data-test="error"]')).
    toContainText('/inventory.html');
});