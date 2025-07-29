# Playwright Automation Framework – Fresh Prep Assignment

This is a modular, scalable end-to-end automation framework built with **Playwright**, designed to meet the requirements of the **Fresh Prep assignment**. It uses the **Page Object Model (POM)** and includes features like automatic per-step screenshots, video recording, HTML reporting, CI/CD via GitHub Actions, and more.

---

## Project Structure

```
├── .github/
│ └── workflows/
│ └── playwright-schedule.yml
├── pages/
│ ├── gift_page.js
├── locators/
│ ├── gift_locators.js
├── tests/
│ ├── gift.spec.js
├── utils/
│ ├── testData.js
│ ├── helpers.js
├── reports/ 
├── test-results/
├── playwright.config.js
├── package.json
└── README.md

```

## Setup Instructions

1. **Install dependencies**  
```bash
npm install

```
2. **Install Playwright browsers**

npx playwright install --with-deps 

npm i playwright

npx playwright install

npm install --save-dev @playwright/test

npm install @faker-js/faker


```
```
## **Running Tests**

Run All Test - npx playwright test

Run a specific test - npx playwright test tests/gift.spec.js

Run test in headed - npx playwright test --headed

```
```

## **Generate Test Report**

After test execution get completed, to generate the test reports follow below commnad.

Generate test reports - npx playwright show-report reports

The above command will open the report directly in browser. 
