# 🧪 Playwright + Allure Test Automation Project

This project uses [Playwright](https://playwright.dev/) for end-to-end and API testing, integrated with [Allure](https://docs.qameta.io/allure/) for generating beautiful test reports.

---

## 🔧 Requirements

- **Node.js** v16 or higher
- **npm** or **yarn**
- **Git**
- **Allure CLI** (see below)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/playwright-tests.git
cd playwright-tests


### Install dependencies

npm install
# or
yarn install

### Run all tests

npx playwright test

### Run tests with a name filter

npx playwright test -g "login"

### Run with the Playwright Test UI

npx playwright test --ui

### Allure Report

### Install Allure CLI (one-time setup)

###Option A: via npm

npm install -g allure-commandline --save-dev

### Option B: via Homebrew (macOS)

brew install allure

### Option C: via Scoop (Windows)

scoop install allure

### Verify installation:

allure --version

### Generate and view the report

# Run the tests

npx playwright test

# Generate the Allure report

allure generate allure-results --clean -o allure-report

# Open the report in the browser

allure open allure-report

### Project Structure
.
├── tests/                 # Test files (API, UI, etc.)
│   ├── api/
│   └── ui/
├── allure-results/        # Raw test results for Allure
├── allure-report/         # Generated HTML report
├── playwright.config.ts   # Playwright configuration
├── package.json
└── README.md

🧩 Useful npm Scripts
npm run test             # Run all tests
npm run allure:generate  # Generate Allure report
npm run allure:open      # Open Allure report in browser

### Add these scripts to your package.json:

"scripts": {
  "test": "npx playwright test",
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report"
}

### Notes

The Allure report is based on test metadata and steps; enrich your tests with labels, steps, and attachments for better clarity.

If you are testing APIs, refer to the tests/api/ folder.

Playwright automatically installs required browsers on the first run.

For CI integration (GitHub Actions, GitLab CI, etc.), additional setup is required — contact the maintainer or see CI documentation.

### Authors / Contacts

Vladyslav Kocherhin

Email: vladyslav.kocherhin@gmail.com