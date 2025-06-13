import { test, expect } from "@playwright/test";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import { name } from "../../playwright.config";
import addCSV from "../../utils/addCSV";

let pathsData = [
  {
    path: "staff-roles-and-permission/permission",
    name: "f_09",
    title: "Group Permission Management - Overview",
    category:"Staff Management System",
  },
  {
    path: "warehouse/inventory",
    name: "c_20",
    title: "Inventory Management - Overview and Edit Inventory",
    category:"Ecommerce Management System",
  },

];
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  // const context = await browser.newContext({
  //   viewport: { width: 1800, height: 600 }, // 设置固定宽度为 800 像素
  // });
  // page = await context.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

pathsData.forEach((pathData) => {
  test.describe(pathData.path, () => {
    test.describe.configure({ mode: "serial" });

    test(`get excel path=${pathData.path}`, async () => {
      await goToPageWaiting({ page, path: pathData.path, type: "admin" });
      await expect(page.locator("div.vue-excel-editor").first()).toBeVisible();
      await new Promise((r) => setTimeout(r, 3000));
      await screenshotNoTime({
        test,
        page,
        filename: pathData.name,
        viewPage: true,
      });
      addCSV([pathData.category,pathData.title, pathData.name, page.url()]);

    });
  });
});
