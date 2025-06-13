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

test.describe.serial("blogs page photo", () => {
  test("blog page and log content", async () => {
    let path = "blogs";
    await goToPage({ page, path, type: "customer" });
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: "b_11",
    // });
    // addCSV(["Blog Management System",
    //   "Forum - Like Post/Comment on Blog Post and Recommendation of Blog Posts",
    //   "b_11",
    //   page.url(),
    // ]);
    const blogImg = await page
      .locator("div.blog-left")
      .first()
      .getByRole("link");
    await blogImg.click();
    test.slow();
    await expect(page.locator("div.col-12.blog-detail").first()).toBeVisible();
    await screenshotNoTime({
      test,
      page,
      filename: "b_13",
    });
    addCSV(["Blog Management System",
      "Forum - Like Post/Comment on Blog Post and Recommendation of Blog Posts/Recommendation Engine - Recommendation of Blog Posts based on priorities",
      "b_13",
      page.url(),
    ]);

  });
});
