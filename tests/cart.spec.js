import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";
import { CartPage } from "../pages/cart";

let login, inventory, items, itemName, itemPrice, shoppingCart, cart, cartItem, burgerMenu, dynamicCatalog;

test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  await login.completeLogin();
  inventory = new InventoryPage(page);

  items = inventory.inventory_items;
  itemName = inventory.item_name;
  itemPrice = inventory.item_price;
  shoppingCart = inventory.shopping_cart;
  burgerMenu = inventory.burger_menu;
  dynamicCatalog = inventory.dynamic_catalog;

  cart = new CartPage(page);
  cartItem = cart.cart_item;
});

test("TC-C01 - View cart with items", async ({ page }) => {
  const listItemName = await itemName.first().textContent();

  const listItemPrice = await itemPrice.first().textContent();

  await items.first().getByRole("button", { name: "Add to cart" }).click();

  await shoppingCart.click();

  await expect(page).toHaveURL(/cart/);

  await expect(page.locator(".inventory_item_name")).toHaveText(listItemName);

  await expect(page.locator(".inventory_item_price")).toHaveText(listItemPrice);

  await expect(page.locator(".cart_quantity")).toHaveCount(1);
});

test("TC-C02 - Empty cart", async ({ page }) => {
  await shoppingCart.click();

  await expect(page).toHaveURL(/cart/);

  await expect(cartItem).toHaveCount(0);

  await expect(page.locator(".inventory_item_price")).toHaveCount(0);
});

test("TC-C03 - Remove item in cart", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();

  await shoppingCart.click();

  await expect(page).toHaveURL(/cart/);

  await expect(page.locator(".cart_quantity")).toHaveCount(1);

  await cartItem.getByRole("button", { name: "Remove" }).click();

  await expect(cartItem.locator(".cart_quantity")).toHaveCount(0);

  await expect(page.locator(".inventory_item_name")).toHaveCount(0);
});

test("TC-C04 - Continue Shopping", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();

  await shoppingCart.click();

  await expect(page).toHaveURL(/cart/);

  await page.getByRole("button", { name: "Continue Shopping" }).click();

  await expect(page).toHaveURL(/inventory/);

  await expect(shoppingCart.locator(".shopping_cart_badge")).toHaveText("1");
});

test("TC-C05 - Cart persists across navigation", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();

  await expect(shoppingCart.locator(".shopping_cart_badge")).toHaveText("1");

  await burgerMenu.click();

  await dynamicCatalog.click();
  await page.locator('[data-test="dynamic-catalog-lazy-load-link"]').click();
  await expect(shoppingCart.locator(".shopping_cart_badge")).toHaveText("1");

  await burgerMenu.click();
  await dynamicCatalog.click();
  await page.locator('[data-test="dynamic-catalog-spinner-link"]').click();
  await expect(shoppingCart.locator(".shopping_cart_badge")).toHaveText("1");

  await burgerMenu.click();
  await dynamicCatalog.click();
  await page.locator('[data-test="dynamic-catalog-slider-link"]').click();
  await expect(shoppingCart.locator(".shopping_cart_badge")).toHaveText("1");
});

test("TC-C06 - Cart badge count", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await items.nth(1).getByRole("button", { name: "Add to cart" }).click();
  await expect(shoppingCart.locator(".shopping_cart_badge")).toHaveText("2");
});
