const { test, chromium, expect, devices } = require("@playwright/test");
const tablet = devices["iPad Pro 11"];
const mobile = devices["iPhone 14"];
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

// 首页自适应拍照 / 登出拍照
test.describe.serial("home page", () => {
  test("home page tablet", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      ...tablet,
    });
    const page = await context.newPage();
    await goToPage({ page, path: "", type: "customer" });
    await screenshotNoTime({
      test,
      page,
      filename: `g_03`,
    });
    addCSV(["Website Management System", "Responsive UI/UX Design - Tablet End", "g_03", page.url()]);
    await browser.close();
  });

  test("home page phone", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      ...mobile,
    });
    const page = await context.newPage();
    await goToPage({ page, path: "", type: "customer" });
    await screenshotNoTime({
      test,
      page,
      filename: `g_02`,
      viewPage: true,
    });
    addCSV(["Website Management System", "Responsive UI/UX Design - Mobile Phone End", "g_02", page.url()]);
    await browser.close();
  });

  test("home page photo", async () => {
    await goToPage({ page, path: "", type: "customer" });
    await new Promise((r) => setTimeout(r, 10000));
    await screenshotNoTime({
      test,
      page,
      filename: `g_01`,
    });
    addCSV(["Website Management System", "Responsive UI/UX Design - PC End", "g_01", page.url()]);
    // await page.setViewportSize({ width: 500, height: 498 });
    // page = await context.newPage();
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `AU`,
    //   viewPage: true,
    // });
    // await page.setViewportSize({ width: 2360, height: 1640 });
    // page = await context.newPage();
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `AV`,
    // });
  });

  test("logout photo", async () => {
    await goToPage({ page, path: "", type: "customer" });
    const userBtn = await page.locator("div.icon-nav > ul > li").nth(1);
    await userBtn.hover();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `B06`,
      viewPage: true,
    });
    addCSV(["Authentication server (Web based) - session management", "B06", page.url()]);
    // addCSV(["Online Shop","Authentication - Logout", "h_05", page.url()]);
  });
});

// 其他静态页面
const pathsData = [
  // { path: "about-us", name: "g_04", title: "Static Pages - About Us", category: "Website Management System", },
  // { path: "contact-us", name: "g_05", title: "Static Pages - Contact Us", category: "Website Management System", },
  // {
  //   path: "terms-of-service/terms-and-conditions",
  //   name: "g_06",
  //   title: "Static Pages - Terms & Conditions",
  //   category: "Website Management System",
  // },
  // {
  //   path: "terms-of-service/privacy-policy",
  //   name: "g_07",
  //   title: "Static Pages - Privacy Policy",
  //   category: "Website Management System",
  // },
  // {
  //   path: "terms-of-service/shipping-policy",
  //   name: "g_08",
  //   title: "Static Pages - Shipping Policy",
  //   category: "Website Management System",
  // },
  // {
  //   path: "terms-of-service/disclaimer",
  //   name: "g_09",
  //   title: "Static Pages - Disclaimer",
  //   category: "Website Management System",
  // },
  // {
  //   path: "terms-of-service/refund-policy",
  //   name: "g_10",
  //   title: "Static Pages - Refund Policy",
  //   category: "Website Management System",
  // },
  // {
  //   path: "terms-of-service/payment-terms-and-special-fees",
  //   name: "g_11",
  //   title: "Static Pages - Payment Terms And Special Fees",
  //   category: "Website Management System",
  // },
  // // 结果页面
  // {
  //   path: "result/order/success",
  //   name: "g_20",
  //   title: "Result Pages - Confirmation Page",
  //   category: "Website Management System",
  // },
  // {
  //   path: "result/order/failure",
  //   name: "g_21",
  //   title: "Result Pages - Failure Page",
  //   category: "Website Management System",
  // },
  // {
  //   path: "result/order/cancelled",
  //   name: "g_22",
  //   title: "Result Pages - Cancellation Page",
  //   category: "Website Management System",
  // },
  // { path: "not-found", name: "g_23", title: "Result Pages - 404 Error Page", category: "Website Management System", },

  {
    path: "about-us",
    name: "C01",
    title: "Corporate Website (Web based) - Corporate information - Business offering",
  },
  {
    path: "about-us",
    name: "C02",
    title: "Corporate Website (Web based) - Corporate information - About us",
  },
  {
    path: "terms-of-service/disclaimer",
    name: "C03",
    title: "Corporate Website (Web based) - Corporate information - Disclaimer",
  },
  // {
  //   path: "shop/main/product",
  //   name: "C07",
  //   title: "Corporate Website (Web based) - Search",
  // },
  {
    path: "contact-us",
    name: "C09",
    title: "Corporate Website (Web based) - Contact us",
  },
  {
    path: "contact-us",
    name: "C10",
    title: "Corporate Website (Web based) - Online enquiry form",
  },
];

pathsData.forEach((pathData) => {
  test.describe.serial(`static paths page path=${pathData.path},name=${pathData.name}`, () => {
    test(`static path=${pathData.path}`, async () => {
      await goToPage({ page, path: pathData.path, type: "customer" });
      await new Promise((r) => setTimeout(r, 3000));
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: pathData.name,
      // });
      // addCSV([pathData.category, pathData.title, pathData.name, page.url()]);

      await screenshotNoTime({
        test,
        page,
        filename: pathData.name,
      });
      addCSV([pathData.title, pathData.name, page.url()]);
    });
  });
});
