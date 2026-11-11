# SauceDemo Test Cases and Playwright Tests

A QA project that documents and automates tests for [SauceDemo](https://www.saucedemo.com/), a public demo e-commerce site built for practicing test automation.

The project has two parts:

1. **Test cases:** manual test cases written for the main areas of the site.
2. **Automation:** Playwright (JavaScript) scripts that run those test cases against the live site.

## What is covered

| Area | What is tested |
| --- | --- |
| Login | Valid login, locked-out user, empty fields, wrong username or password, case sensitivity, closing the error banner, password masking, direct URL access without logging in |
| Inventory | Product list, sorting by name and price, product details, adding and removing items |
| Cart | Viewing items, removing items, continuing shopping, cart badge count |
| Checkout | Full purchase flow, required-field validation, cancel actions, order totals (item total, 8% tax, total) |
| Menu, logout and session | Side menu, logout, back button after logout, reset app state |

Each test case has an ID (for example `TC-L01` for login or `TC-CH01` for checkout), steps and an expected result. The full list is in [TEST_CASES.md](TEST_CASES.md).

## Test data

SauceDemo provides public demo accounts. All use the password `secret_sauce`.

| Username | Behavior |
| --- | --- |
| `standard_user` | Normal account |
| `locked_out_user` | Login is blocked with a locked-out error |

## Notes

- The 8% tax rate is observed behavior of the site, not a documented requirement.
- SauceDemo is a public demo site, so tests depend on it staying online and unchanged.

## Tech stack

- [Playwright](https://playwright.dev/) with JavaScript
- Node.js

## Getting started

```bash
# Clone the repository
git clone https://github.com/Lubnas-git/Playwright_Demo
cd Playwright_Demo

# Install dependencies
npm install

# Install the browsers Playwright needs
npx playwright install

# Run all tests
npx playwright test

# Run one test file
npx playwright test tests/login.spec.js

# Run with the browser visible
npx playwright test --headed

# Open the HTML report
npx playwright show-report
```

## Project structure

```
tests/
  login.spec.js     Login tests
  ...               Other test files
playwright.config.js
package.json
README.md
```

## Author

Lubna Araman
