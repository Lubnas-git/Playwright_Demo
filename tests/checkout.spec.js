import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";
import { CheckoutPage } from "../pages/checkout";

let login, inventory, items, itemName, itemPrice, shoppingCart, addToCartBtn;

let checkout, checkoutBtn, continueBtn, finishBtn, firstName, lastName, zipCode;

test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  await login.completeLogin();

  inventory = new InventoryPage(page);
  items = inventory.inventory_items;
  itemName = inventory.item_name;
  itemPrice = inventory.item_price;
  shoppingCart = inventory.shopping_cart;
  addToCartBtn = inventory.addToCartBtn;

  checkout = new CheckoutPage(page);
  checkoutBtn = checkout.checkout_Btn;
  continueBtn = checkout.continue_Btn;
  finishBtn = checkout.finish_Btn;

  firstName = checkout.first_Name;
  lastName = checkout.last_Name;
  zipCode = checkout.zip_Code;

});

test("TC-CH01 - Checkout with valid info", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await items.nth(1).getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);
  await firstName.fill("John");
  await lastName.fill("Doe");
  await zipCode.fill("12345");

  await continueBtn.click();

  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.getByText("Overview")).toBeVisible();

  await expect(itemName.first()).toBeVisible();
  await expect(itemName.nth(1)).toBeVisible();

  await finishBtn.click();

  await expect(page.getByText("Thank you for your order!")).toBeVisible();
});

test("TC-CH02 - Empty first name", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);

  await firstName.fill("");

  await continueBtn.click();

  await expect(page.getByText("Error: First Name is required")).toBeVisible();
});
test("TC-CH03 - Empty Last name", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);

  await firstName.fill("John");

  await lastName.fill("");

  await continueBtn.click();

  await expect(page.getByText("Error: Last Name is required")).toBeVisible();
});

test("TC-CH04 - Empty ZIP code", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);

  await firstName.fill("John");

  await lastName.fill("Doe");

  await zipCode.fill("");

  await continueBtn.click();

  await expect(page.getByText("Error: Postal Code is required")).toBeVisible();
});

test("TC-CH05 - All fields empty", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);

  await firstName.fill("");

  await lastName.fill("");

  await zipCode.fill("");

  await continueBtn.click();

  await expect(page.getByText("Error: First Name is required")).toBeVisible();
});

test("TC-CH06 - Overview totals", async ({ page }) => {
  let firstItemPriceText = await items
    .first()
    .locator(".inventory_item_price")
    .textContent();

  let firstItemPrice = parseFloat(firstItemPriceText.replace("$", ""));

  console.log("first: " + firstItemPrice);

  await items.first().getByRole("button", { name: "Add to cart" }).click();

  let secondItemPriceText = await items
    .nth(1)
    .locator(".inventory_item_price")
    .textContent();

  let secondItemPrice = parseFloat(secondItemPriceText.replace("$", ""));

  console.log("Second: " + secondItemPrice);

  await items.nth(1).getByRole("button", { name: "Add to cart" }).click();

  let subtotal = firstItemPrice + secondItemPrice;
  let roundedSubtotalNumber = Number(subtotal.toFixed(2));
  console.log("Rounded sub: " + roundedSubtotalNumber);

  let tax = subtotal * 0.08;
  let roundedTaxNumber = Number(tax.toFixed(2));
  console.log("Rounded tax: " + roundedTaxNumber);

  let total = subtotal + tax;
  let roundedTotalNumber = Number(total.toFixed(2));
  console.log("Rounded total: " + roundedTotalNumber);

  await shoppingCart.click();

  await checkoutBtn.click();

  await firstName.fill("John");

  await lastName.fill("Doe");

  await zipCode.fill("12345");

  await continueBtn.click();

  await expect(page.getByText("Overview")).toBeVisible();

  await expect(page.getByText("Item total")).toContainText(
    roundedSubtotalNumber.toString(),
  );

  await expect(page.getByText("Tax")).toContainText(
    roundedTaxNumber.toString(),
  );

  await expect(page.locator(".summary_total_label")).toContainText(
    roundedTotalNumber.toString(),
  );
});

test("TC-CH07 - Cancel on information page", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);
  await firstName.fill("John");
  await lastName.fill("Doe");
  await zipCode.fill("12345");

  await page.getByRole("button", { name: "Cancel" }).click();

  await expect(page).toHaveURL(/cart/);
});

test("TC-CH08 - Cancel on overview page", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);

  await firstName.fill("John");

  await lastName.fill("Doe");

  await zipCode.fill("12345");

  await continueBtn.click();

  await expect(page).toHaveURL(/checkout-step-two/);

  await expect(page.getByText("Overview")).toBeVisible();

  await page.getByRole("button", { name: "Cancel" }).click();

  await expect(page).toHaveURL(/inventory/);
});

test("TC-CH09 - Back Home after order", async ({ page }) => {
  await items.first().getByRole("button", { name: "Add to cart" }).click();

  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page).toHaveURL(/checkout-step-one/);

  await firstName.fill("John");

  await lastName.fill("Doe");

  await zipCode.fill("12345");

  await continueBtn.click();

  await expect(page).toHaveURL(/checkout-step-two/);

  await expect(page.getByText("Overview")).toBeVisible();

  await expect(itemName.first()).toBeVisible();

  await finishBtn.click();

  await expect(page.getByText("Thank you for your order!")).toBeVisible();

  await page.getByRole("button", { name: "Back Home" }).click();

  await expect(page).toHaveURL(/inventory/);

  await shoppingCart.click();

  await expect(page.locator(".cart_item")).toHaveCount(0);
});

test("TC-CH10 - Checkout with an empty cart", async ({ page }) => {
  await shoppingCart.click();

  await checkoutBtn.click();

  await expect(page.getByText("/Error/")).toBeVisible();
  //Real Bug: this test will always fail, since Saucedemo allows to checkout with empty cart!
});
