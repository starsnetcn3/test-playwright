import { test, expect } from "@playwright/test";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import { name, timeout } from "../../playwright.config";
import addCSV from "../../utils/addCSV";

let getPhotoData = [
  {
    path: "shop/discount/main",
  },
  //   {
  //     path: "shop/discount/promotion-code",
  //   },
];

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

getPhotoData.forEach((data) => {
  test.describe(data.path, () => {
    test.describe.configure({ mode: "serial" });
    test(`Get table photo path=${data.path}`, async () => {
      await goToPageWaiting({ page, path: data.path, type: "admin" });
      await page.locator("a#sc-sidebar-main-toggle").first().click();
      await page.locator("a#sc-sidebar-main-toggle").first().click();
      await expect(page.getByLabel("search").first()).toBeVisible();
      switch (data.path) {
        case "shop/discount/main":

          // 打开创建页面
          await page.getByRole("button", { name: "create" }).hover();
          await page.locator('text="Store"').nth(1).click();
          //   const refreshBtn = await page.getByRole("button", { name: "refresh" });
          //   await refreshBtn.click();
          // await page.getByLabel("search").first().hover();
          await page.getByPlaceholder("Title").first().fill("10% off");
          await page.getByPlaceholder("Title").nth(1).fill("折扣 10%");
          await page.getByPlaceholder("Description").first().fill("10% off");
          await page.getByPlaceholder("Description ").nth(1).fill("折扣 10%");
          await page.getByPlaceholder("Remarks").first().fill("折扣 10%");

          // 定位单选框并点击
          await page.locator('input[type="radio"][value="PRICE"]').click(); // 替换为实际单选框的选择器
          await new Promise((r) => setTimeout(r, 1000));
          await screenshotNoTime({
            test,
            page,
            filename: "c_24",
            viewPage: true,
          });
          addCSV([
            "Ecommerce Management System",
            "Discount Management - Detail of Price Discount",
            "c_24",
            page.url(),
          ]);
          // 定位单选框并点击
          await page.locator('input[type="radio"][value="PERCENTAGE"]').click(); // 替换为实际单选框的选择器
          await new Promise((r) => setTimeout(r, 1000));
          await screenshotNoTime({
            test,
            page,
            filename: "c_25",
            viewPage: true,
          });
          addCSV([
            "Ecommerce Management System",
            "Discount Management - Detail of Percentage Discount",
            "c_25",
            page.url(),
          ]);
          // 定位单选框并点击
          await page
            .locator('input[type="radio"][value="BUY_X_GET_Y_FREE"]')
            .click(); // 替换为实际单选框的选择器
          await new Promise((r) => setTimeout(r, 1000));
          await screenshotNoTime({
            test,
            page,
            filename: "c_26",
            viewPage: true,
          });
          addCSV([
            "Ecommerce Management System",
            "Discount Management - Detail of buy nX get mY free Discount",
            "c_26",
            page.url(),
          ]);
          //    回来去截图free
          await goToPageWaiting({ page, path: data.path, type: "admin" });
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await expect(page.getByLabel("search").first()).toBeVisible();
          // 打开创建页面
          await page.getByRole("button", { name: "create" }).hover();
          await page.locator('text="Free Shipping"').nth(1).click();
          //   const refreshBtn = await page.getByRole("button", { name: "refresh" });
          //   await refreshBtn.click();
          // await page.getByLabel("search").first().hover();
          await page.getByPlaceholder("Title").first().fill("15% off");
          await page.getByPlaceholder("Title").nth(1).fill("折扣 15%");
          await page.getByPlaceholder("Description").first().fill("15% off");
          await page.getByPlaceholder("Description ").nth(1).fill("折扣 15%");
          await page.getByPlaceholder("Remarks").first().fill("折扣 15%");
          await new Promise((r) => setTimeout(r, 1000));
          await screenshotNoTime({
            test,
            page,
            filename: "c_27",
            viewPage: true,
          });
          addCSV([
            "Ecommerce Management System",
            "Discount Management - Detail of Free Shipping Discount",
            "c_27",
            page.url(),
          ]);
          await goToPageWaiting({ page, path: data.path, type: "admin" });
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await expect(page.getByLabel("search").first()).toBeVisible();
          await page.getByRole("button", { name: "create" }).hover();
          await page.locator('text="Voucher"').nth(2).click();
          await page.getByPlaceholder("Title").first().fill("20% off");
          await page.getByPlaceholder("Title").nth(1).fill("折扣 20%");
          await page.getByPlaceholder("Description").first().fill("20% off");
          await page.getByPlaceholder("Description ").nth(1).fill("折扣 20%");
          await page.getByPlaceholder("Remarks").first().fill("折扣 20%");
          await new Promise((r) => setTimeout(r, 1000));
          await screenshotNoTime({
            test,
            page,
            filename: "c_28",
            viewPage: true,
          });
          //   创建代金卷
          addCSV([
            "Ecommerce Management System",
            "Discount Management - Auto Apply Upon Checkout",
            "c_28",
            page.url(),
          ]);

          await goToPageWaiting({ page, path: data.path, type: "admin" });
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await page.getByRole("button", { name: "create" }).hover();
          await page.locator('text="Promotion Code"').nth(2).click();
          await page.getByPlaceholder("Title").first().fill("25% off");
          await page.getByPlaceholder("Title").nth(1).fill("折扣 25%");
          await page.getByPlaceholder("Description").first().fill("25% off");
          await page.getByPlaceholder("Description ").nth(1).fill("折扣 25%");
          await page.getByPlaceholder("Remarks").first().fill("折扣 25%");
          await new Promise((r) => setTimeout(r, 1000));
          await screenshotNoTime({
            test,
            page,
            filename: "c_29",
            viewPage: true,
          });
          //   创建代金卷
          addCSV([
            "Ecommerce Management System",
            "Discount Management - Discount Code",
            "c_29",
            page.url(),
          ]);
          break;

        default:

          break;
      }


      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: data.name,
      //   viewPage: true,
      // });
      // addCSV([data.category, data.title, data.name, page.url()]);
    });
  });
});
