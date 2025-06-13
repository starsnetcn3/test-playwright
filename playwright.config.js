// @ts-check
const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const customerUrl = process.env.CUSTOMER_URL;
const adminUrl = process.env.ADMIN_URL;

const multikartCbasedClients = [
  {
    name: "https://www.sandybeautyqueen.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.sandybeautyqueen.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
];

const ktcoolBasedClients = [
  {
    name: "https://www.cm-mobile.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.cm-mobile.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.king-ten-digital.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.king-ten-digital.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.sky-digital.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.sky-digital.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.sun-kwong.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.sun-kwong.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.videocom-technology.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.videocom-technology.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.wo-kee.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.wo-kee.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.ebgames.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.ebgames.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.heifei.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.heifei.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
];

const fancyBeautyBasedClients = [
  {
    name: "https://www.rolling-concepts.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.rolling-concepts.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.sunny-rainbow.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.sunny-rainbow.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.triplegaga.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.triplegaga.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.tuensirpaperart.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.tuensirpaperart.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.wah-keung.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.wah-keung.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.whiskywhiskers.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.whiskywhiskers.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.woody-florist.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.woody-florist.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.3abe-tarot.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.3abe-tarot.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.adiamondlimited.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.adiamondlimited.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.camelliaa-pro.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.camelliaa-pro.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.casamodernism.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.casamodernism.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.cc-collection.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.cc-collection.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.charisma-beauty.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.charisma-beauty.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.eagle-furniture.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.eagle-furniture.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.fancy-beauty.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.fancy-beauty.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.gracepace.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.gracepace.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.peacock-video.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.peacock-video.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.pharoseducation.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.pharoseducation.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://customer.benchanted-store.explore.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://customer.benchanted-store.explore.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://customer.sd-workshop.explore.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://customer.sd-workshop.explore.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://customer.mascot.explore.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://customer.mascot.explore.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.peacock-video.com.hk",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.peacock-video.com.hk",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
  {
    name: "https://www.wah-keung.com",
    use: {
      ...devices["Desktop Chromium"],
      baseURL: "https://www.wah-keung.com",
    },
    testDir: "./tests/flow",
    retries: 0,
  },
];

module.exports = defineConfig({
  // testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 60 * 3000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 3000 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3,
  /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "off",
    // baseURL: '',
  },

  /* Configure projects for major browsers */
  projects: [
    // ...multikartCbasedClients,
    // ...ktcoolBasedClients,
    // ...fancyBeautyBasedClients,
    {
      name: "customer_auth",
      testMatch: /customer.auth.js/,
      use: {
        ...devices["Desktop Chromium"],
        baseURL: customerUrl,
      },
    },
    {
      name: "admin_auth",
      testMatch: /admin.auth.js/,
      use: {
        ...devices["Desktop Chromium"],
        baseURL: adminUrl,
      },
    },
    {
      name: "Admin Auth",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: adminUrl,
        storageState: ".auth/admin.json",
      },
      testDir: "./tests/admin",
      retries: 0,
      dependencies: ["admin_auth"],
    },
    {
      name: "Admin Guest",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: adminUrl,
      },
      testDir: "./tests/admin",
      testMatch: ["guest.spec.js"],
      retries: 0,
    },
    {
      name: "Customer Auth",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: customerUrl,
        storageState: ".auth/customer.json",
      },
      testDir: "./tests/customer",
      retries: 0,
      dependencies: ["customer_auth"],
    },
    {
      name: "Customer Flow",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: customerUrl,
      },
      testDir: "./tests/flow",
      retries: 0,
    },
    {
      name: "Customer Guest",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: customerUrl,
      },
      testDir: "./tests/customer",
      retries: 0,
    },
    {
      name: "Admin Screenshot",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: adminUrl,
        storageState: ".auth/admin.json",
      },
      testDir: "./tests/admin-screenshots",
      retries: 0,
      dependencies: ["admin_auth"],
    },
    {
      name: "Customer Screenshot",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: customerUrl,
        storageState: ".auth/customer.json",
      },
      testDir: "./tests/customer-screenshots",
      retries: 0,
      dependencies: ["customer_auth"],
    },
    {
      name: "CSV Action",
      testDir: "./tests/csv-action",
      retries: 0,
    },
    {
      name: "Flow Screenshot",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: customerUrl,
      },
      testDir: "./tests/flow-screenshots",
      retries: 0,
    },
    {
      name: "Netdisk Screenshot",
      use: {
        ...devices["Desktop Chromium"],
        baseURL: "http://localhost:8080/",
        // storageState: ".auth/customer.json",
      },
      testDir: "./tests/netdisk-screenshots",
      retries: 0,
      // dependencies: ["customer_auth"],
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
