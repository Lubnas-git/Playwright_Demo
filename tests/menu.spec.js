import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";
import { shoppingCart } from "./inventory.spec";

test.describe("Menu Tests", () => {
  let login, inventory, burgerMenu, inventoryItems;
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.completeLogin();
    await expect(page).toHaveURL(/inventory/);

    inventory = new InventoryPage(page);
    burgerMenu = inventory.burger_menu;
    inventoryItems = inventory.inventory_items;
  });

  test("TC-M01 - Open and close the side menu", async ({ page }) => {
    //open the menu
    await burgerMenu.click();

    await expect(page.getByText("All Items")).toBeVisible();

    await expect(page.getByText("About")).toBeVisible();

    await expect(page.getByText("Dynamic Catalog")).toBeVisible();

    await expect(page.getByText("Logout")).toBeVisible();

    await expect(page.getByText("Reset App State")).toBeVisible();

    //close the menu
    await page.getByRole("button", { name: "Close Menu" }).click();

    await expect(page.getByText("All Items")).toBeHidden();

    await expect(page.getByText("About")).toBeHidden();

    await expect(page.getByText("Dynamic Catalog")).toBeHidden();

    await expect(page.getByText("Logout")).toBeHidden();

    await expect(page.getByText("Reset App State")).toBeHidden();

  });

  test("TC-M02 - Logout", async ({ page }) => {
    //open the menu
    await burgerMenu.click();

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com');
  });

  test("TC-M03 - Back button after logout", async ({ page }) => {
    //open the menu
    await burgerMenu.click();

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com');

    await page.goBack();

    await expect(page).toHaveURL('https://www.saucedemo.com');

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access');

  });

  test("TC-M04 - Reset App State", async ({ page }) => {

    await inventoryItems.first().getByRole("button", { name: "Add to cart" }).click();

    await expect(shoppingCart).toHaveCount(1);

    //open the menu
    await burgerMenu.click();

    await page.getByRole("button", { name: "Reset App State" }).click();

    await expect(shoppingCart).toHaveCount(0);

  });

  test("TC-M05 - About link", async ({ page }) => {

    //open the menu
    await burgerMenu.click();

    await page.getByRole("button", { name: "About" }).click();

    await expect(page).toHaveURL('https://saucelabs.com/');

  });

});


test.describe("Session test", () => {

  test("TC-M06 - Session timeout", async ({ page, context }) => {
    
    let login = new LoginPage(page);
 
    await page.clock.install();

    await login.completeLogin();

   await expect(page).toHaveURL(/inventory/);

    await page.clock.fastForward('10:00');
    
    await expect(page).toHaveURL('https://www.saucedemo.com');
   //this is supposed to fail since the website doesn't go back to login page after 10 minutes of inactivity
  });

});
