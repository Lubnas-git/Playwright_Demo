import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { InventoryPage } from '../pages/inventory';

let login;
test.describe('Inventory List Tests', () => {
    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.loginNow();
        await expect(page).toHaveURL(/inventory/);
    });

    test('TC-I01 - Product list displays', async ({ page }) => {
        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);

        const itemLocators = await items.all();

        for (const itemLocator of itemLocators) {
            await expect(itemLocator.locator('img')).toBeVisible();
            await expect(itemLocator.locator('.inventory_item_name')).toBeVisible();
            await expect(itemLocator.locator('.inventory_item_description')).toBeVisible();
            await expect(itemLocator.locator('.inventory_item_price')).toBeVisible();
            await expect(itemLocator.getByRole('button', { name: 'Add to cart' })).toBeVisible();
        }
    });

    test('TC-I02 - Sort by Name (A to Z)', async ({ page }) => {

        await page.locator('.product_sort_container').selectOption('az');
        const actualNames = await page.locator('.inventory_item_name').allTextContents();
        const expectedNames = [...actualNames].sort();
        expect(actualNames).toEqual(expectedNames);
    });

    test('TC-I03 - Sort by Name (Z to A)', async ({ page }) => {

        await page.locator('.product_sort_container').selectOption('za');
        const actualNames = await page.locator('.inventory_item_name').allTextContents();
        const expectedNames = [...actualNames].sort().reverse();
        expect(actualNames).toEqual(expectedNames);
    });

    test('TC-I04 - Sort by Price (low to high)', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption('lohi');
        const actualPrices = await page.locator('.inventory_item_price').allTextContents();
        const expectedPrices = [...actualPrices].sort((a, b) => {
            return parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''));
        });
        expect(actualPrices).toEqual(expectedPrices);
    });

    test('TC-I05 - Sort by Price (high to low)', async ({ page }) => {
        await page.locator('.product_sort_container').selectOption('hilo');
        const actualPrices = await page.locator('.inventory_item_price').allTextContents();
        const expectedPrices = [...actualPrices].sort((a, b) => {
            return parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''));
        });
        expect(actualPrices).toEqual(expectedPrices);
    });

    test('TC-I06 - Open product details', async ({ page }) => {
        const itemName = await page.locator('.inventory_item_name').first().textContent();
        const itemDescription = await page.locator('.inventory_item_desc').first().textContent();
        const itemPrice = await page.locator('.inventory_item_price').first().textContent();

        await page.locator('.inventory_item_name').first().click();

        await expect(page).toHaveURL(/inventory-item/);

        await expect(page.locator('.inventory_details_name')).toHaveText(itemName);
        await expect(page.locator('.inventory_details_desc')).toHaveText(itemDescription);
        await expect(page.locator('.inventory_details_price')).toHaveText(itemPrice);

    });

    test('TC-I07 - Back to products', async ({ page }) => {

        await page.locator('.inventory_item_name').first().click();
        await expect(page).toHaveURL(/inventory-item/);
        await page.getByRole('button', { name: 'Back to products' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

});

test.describe('Adding/Removing from cart', () => {
    let inventory, inventoryItems;
    test.beforeEach(async ({page}) => {
       login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.loginNow();
        await expect(page).toHaveURL(/inventory/);
        inventory = new InventoryPage(page);
        inventoryItems = inventory.inventory_items;
    });

    test('TC-I08 - Add to cart from list', async ({ page }) => {
        await inventoryItems.first().getByRole('button', { name: 'Add to Cart' }).click();
        await expect(inventoryItems.first().getByRole('button', { name: 'Remove' })).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
    });

    test('TC-I09 - Remove from list', async ({ page }) => {
        await inventoryItems.first().getByRole('button', { name: 'Add to Cart' }).click();
        await inventoryItems.first().getByRole('button', { name: 'Remove' }).click();
        await expect(inventoryItems.first().getByRole('button', { name: 'Add to Cart' })).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });
});
