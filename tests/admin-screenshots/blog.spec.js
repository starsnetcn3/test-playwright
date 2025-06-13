import { test, expect } from "@playwright/test";
import { exec } from "child_process";
const fs = require("fs");
const path = require("path");
import goToPage from "../../utils/goToPage";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import checkApi from "../../utils/checkApi";
import addCSV from "../../utils/addCSV";

// let pathsData = [

//   {
//     path: "blog/post/details?_id=65f3d3f9e847356c3285800f",
//     name: "b_10",
//     title: "SEO Management - editing of meta data including title, short description and keywords",
//     category:"Blog Management System",
//   },

// ];
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

// pathsData.forEach(async (pathData) => {
test.describe.serial("blogs page photo", () => {
  let path = "blog/post/details?_id=67aec0bf8bdfe0c69b07cddf";
  test(`Get static photo path=${path}`, async () => {
    await goToPageWaiting({ page, path, type: "admin" });
    await page.locator("a#sc-sidebar-main-toggle").first().click();
    await page.locator("a#sc-sidebar-main-toggle").first().click();
    await expect(
      page.locator("input.uk-input.sc-vue-input.sc-input-outline").first()
    ).toBeVisible();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: "b_10",
      viewPage: true,
    });
    addCSV(["Blog Management System", "SEO Management - editing of meta data including title/short description and keywords", "b_10", page.url()]);

    await page.locator('text="Comments"').click();
    await new Promise((r) => setTimeout(r, 1000));
    await screenshotNoTime({
      test,
      page,
      filename: "b_12",
      viewPage: true,
    });
    addCSV([
      "Blog Management System",
      " Forum - Authorized Administrators can remove comments ",
      "b_12",
      page.url(),
    ]);

    await goToPageWaiting({ page, path: "warehouse/product", type: "admin" });
    await page.locator("a#sc-sidebar-main-toggle").first().click();
    await page.locator("a#sc-sidebar-main-toggle").first().click();
    await expect(page.getByLabel("search").first()).toBeVisible();
    let editBtn = null;
    editBtn = await page.locator("tr.odd").first().getByRole("link");
    await editBtn.click();
    // 判断编辑页等待什么元素显示
    // await expect(page.getByLabel("div.ck-editor").first()).toBeVisible();
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page,
      filename: "c_14",
      viewPage: true,
    });
    addCSV(["Ecommerce Management System", "SEO Management - Auto-generation of meta data including title/short description and keywords", "c_14", page.url()]);


  });
});
// });
