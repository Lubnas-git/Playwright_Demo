# SauceDemo Test Cases

Manual test cases for [SauceDemo](https://www.saucedemo.com/). Each case has an ID, steps (where needed) and an expected result.

**Test data:** `standard_user` and `locked_out_user`, both with the password `secret_sauce`.

## 1. Login

| ID | Test case | Steps | Expected result |
| --- | --- | --- | --- |
| TC-L01 | Valid login (standard) | Enter `standard_user` / `secret_sauce`, click Login | Products page opens, with the title "PRODUCTS" |
| TC-L02 | Locked-out user | Enter `locked_out_user` / `secret_sauce` | Error: "Epic sadface: Sorry, this user has been locked out." User stays on the login page |
| TC-L03 | Empty username and password | Click Login with both fields empty | "Epic sadface: Username is required" |
| TC-L04 | Empty password | Enter `standard_user`, leave password empty | "Epic sadface: Password is required" |
| TC-L05 | Wrong username | Enter `wrong_user` / `secret_sauce` | "Epic sadface: Username and password do not match any user in this service" |
| TC-L06 | Wrong password | Enter `standard_user` / `wrong_pass` | Same "do not match" error as TC-L05 |
| TC-L07 | Case sensitivity | Enter `STANDARD_USER` / `secret_sauce` | Login fails with the "do not match" error |
| TC-L08 | Error banner can be closed | Trigger any error, click the X on the banner | Banner disappears |
| TC-L09 | Password masking | Type in the password field | Characters are masked |
| TC-L10 | Direct URL access without login | Open `/inventory.html` in a fresh session | Redirected to the login page, which shows an error that you must be logged in to access the page |

## 2. Inventory (Products page)

| ID | Test case | Expected result |
| --- | --- | --- |
| TC-I01 | Product list displays | 6 products, each with image, name, description, price and an Add to cart button |
| TC-I02 | Sort by Name (A to Z) | Items in ascending alphabetical order |
| TC-I03 | Sort by Name (Z to A) | Items in descending alphabetical order |
| TC-I04 | Sort by Price (low to high) | Prices in ascending order |
| TC-I05 | Sort by Price (high to low) | Prices in descending order |
| TC-I06 | Open product details | Clicking a name or image opens the details page with matching name, description and price |
| TC-I07 | Back to products | The Back button returns to the list |
| TC-I08 | Add to cart from list | Button changes to "Remove" and the cart badge increments |
| TC-I09 | Remove from list | Button reverts to "Add to cart" and the badge decrements or disappears |

## 3. Cart

| ID | Test case | Expected result |
| --- | --- | --- |
| TC-C01 | View cart with items | Added items are listed with the correct name, price and quantity |
| TC-C02 | Empty cart | No items shown and no badge |
| TC-C03 | Remove item in cart | Item disappears and the badge updates |
| TC-C04 | Continue Shopping | Returns to the Products page and keeps cart contents |
| TC-C05 | Cart persists across navigation | Items stay after visiting other pages |
| TC-C06 | Cart badge count | Badge equals the number of added items |

## 4. Checkout

| ID | Test case | Expected result |
| --- | --- | --- |
| TC-CH01 | Checkout with valid info | Full purchase flow completes: Cart, Your Information, Overview, "Thank you for your order" |
| TC-CH02 | Empty first name | Error that first name is required |
| TC-CH03 | Empty last name | Error that last name is required |
| TC-CH04 | Empty postal code | Error that postal code is required |
| TC-CH05 | All fields empty | First-name-required error shown first |
| TC-CH06 | Overview totals | Item total equals the sum of item prices; tax is 8% of the item total, rounded to the cent; total = item total + tax |
| TC-CH07 | Cancel on information page | Returns to the cart |
| TC-CH08 | Cancel on overview page | Returns to the Products page |
| TC-CH09 | Back Home after order | Returns to Products with an empty cart |
| TC-CH10 | Checkout with an empty cart | Record the actual behavior |

## 5. Menu, logout and session

| ID | Test case | Expected result |
| --- | --- | --- |
| TC-M01 | Open and close the side menu | Shows All Items, About, Logout, Reset App State |
| TC-M02 | Logout | Returns to the login page |
| TC-M03 | Back button after logout | Does not restore an authenticated session |
| TC-M04 | Reset App State | Cart is cleared |
| TC-M05 | About link | Opens the Sauce Labs site |
