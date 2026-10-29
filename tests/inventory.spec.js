import { test, expect } from '@playwright/test';

import {LoginPage} from '../pages/login';

let login;

test('TC-I01 - Product list displays', async ({ page }) => {
    login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);

    const itemLocators = await items.all();

    for (const itemLocator of itemLocators) {
        await expect(itemLocator.locator('img')).toBeVisible();
        await expect(itemLocator.locator('.inventory_item_description')).toBeVisible();
        await expect(itemLocator.locator('.inventory_item_price')).toBeVisible();
        await expect(itemLocator.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
});    
