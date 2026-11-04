import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { InventoryPage } from '../pages/inventory';

let login;
let inventory, inventoryItems, productSort,
    itemName, itemPrice, itemDesc,
    shoppingCart, addToCartBtn, removeBtn;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.completeLogin();
    await expect(page).toHaveURL(/inventory/);

    inventory = new InventoryPage(page);
    inventoryItems = inventory.inventory_items;
    productSort = inventory.product_sort;
    itemName = inventory.item_name;
    itemPrice = inventory.item_price;
    itemDesc = inventory.item_description;
    shoppingCart = inventory.shopping_cart;
    addToCartBtn = inventory.add_to_cart_btn;
    removeBtn = inventory.remove_btn;
});

test('TC-I01 - Product list displays', async ({ page }) => {
    //const items = inventoryItems
    await expect(inventoryItems).toHaveCount(6);

    const itemLocators = await inventoryItems.all();

    for (const itemLocator of itemLocators) {
        await expect(itemLocator.locator('img')).toBeVisible();
        await expect(itemLocator.locator('.inventory_item_name')).toBeVisible();
        await expect(itemLocator.locator('.inventory_item_description')).toBeVisible();
        await expect(itemLocator.locator('.inventory_item_price')).toBeVisible();
        await expect(itemLocator.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
});

test('TC-I02 - Sort by Name (A to Z)', async ({ page }) => {

    await productSort.selectOption('az');
    const actualNames = await itemName.allTextContents();
    const expectedNames = [...actualNames].sort();
    expect(actualNames).toEqual(expectedNames);
});

test('TC-I03 - Sort by Name (Z to A)', async ({ page }) => {

    await productSort.selectOption('za');
    const actualNames = await itemName.allTextContents();
    const expectedNames = [...actualNames].sort().reverse();
    expect(actualNames).toEqual(expectedNames);
});

test('TC-I04 - Sort by Price (low to high)', async ({ page }) => {
    await productSort.selectOption('lohi');
    const actualPrices = await itemPrice.allTextContents();
    const expectedPrices = [...actualPrices].sort((a, b) => {
        return parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''));
    });
    expect(actualPrices).toEqual(expectedPrices);
});

test('TC-I05 - Sort by Price (high to low)', async ({ page }) => {
    await productSort.selectOption('hilo');
    const actualPrices = await itemPrice.allTextContents();
    const expectedPrices = [...actualPrices].sort((a, b) => {
        return parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''));
    });
    expect(actualPrices).toEqual(expectedPrices);
});

test('TC-I06 - Open product details', async ({ page }) => {
    const listItemName = await itemName.first().textContent();
    const listItemDescription = await itemDesc.first().textContent();
    const listItemPrice = await itemPrice.first().textContent();

    await itemName.first().click();

    await expect(page).toHaveURL(/inventory-item/);

    await expect(page.locator('.inventory_details_name')).toHaveText(listItemName);
    await expect(page.locator('.inventory_details_desc')).toHaveText(listItemDescription);
    await expect(page.locator('.inventory_details_price')).toHaveText(listItemPrice);

});

test('TC-I07 - Back to products', async ({ page }) => {

    await itemName.first().click();
    await expect(page).toHaveURL(/inventory-item/);
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('TC-I08 - Add to cart from list', async ({ page }) => {
    await inventoryItems.first().getByRole('button', { name: 'Add to Cart' }).click();
    await expect(inventoryItems.first().getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(shoppingCart).toHaveCount(1);
});

test('TC-I09 - Remove from list', async ({ page }) => {
    await inventoryItems.first().getByRole('button', { name: 'Add to Cart' }).click();
    await inventoryItems.first().getByRole('button', { name: 'Remove' }).click();
    await expect(inventoryItems.first().getByRole('button', { name: 'Add to Cart' })).toBeVisible();
    await expect(shoppingCart).toHaveCount(0);
});