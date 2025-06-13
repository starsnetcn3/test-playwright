const { test, expect } = require("@playwright/test");
import goToPage from "../../utils/goToPage";
import screenshotNoTime from "../../utils/screenshotNoTime";
import addCSV from "../../utils/addCSV";

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

let pathData = [
  // {
  //   path: "account",
  //   name: "a_01",
  //   title: "Account Management - Member Profile Details",
  //   category: "Membership System",
  // },
  // {
  //   path: "account/address",
  //   name: "a_02",
  //   title: "Account Management - Address Book",
  //   category: "Membership System",
  // },
  // {
  //   path: "account/contact",
  //   name: "a_03",
  //   title:
  //     "Account Management - Contact Preference/Language Preference/Notification Settings",
  //   category: "Membership System",
  // },
  // {
  //   path: "account/email",
  //   name: "a_04",
  //   title: "Account Management - Change of Email",
  //   category: "Membership System",
  // },
  {
    path: "account/password",
    name: "B03",
    title: "Authentication server (Web based) - user management - allow user changing password",
    // category: "Membership System",
  },
  // {
  //   path: "account/membership",
  //   name: "a_06",
  //   title:
  //     "Membership Points Management - Overview of Membership Points and Transactions",
  //   category: "Membership System",
  // },
];

pathData.forEach((pathData) => {
  test.describe.serial(`static path=${pathData.name}`, () => {
    test(`static path=${pathData.path}`, async () => {
      await goToPage({ page, path: pathData.path, type: "customer" });
      await new Promise((r) => setTimeout(r, 2000))
      await screenshotNoTime({
        test,
        page,
        filename: pathData.name,
      });
      // addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
      addCSV([pathData.title, pathData.name, page.url()]);
    });
  });
});
