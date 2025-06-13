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

test.describe.serial("authentication screenshots", () => {
  test("login photo", async () => {
    await goToPage({
      page,
      path: "authentication/login/email",
      type: "customer",
    });
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `B02`,
    });
    addCSV(["Authentication server (Web based) - single sign on", "B02", page.url()]);
    // addCSV(["Online Shop","Authentication - Login", "h_01", page.url()]);
  });
  test("register photo", async () => {
    await goToPage({
      page,
      path: "authentication/register/email",
      type: "customer",
    });
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `B01`,
    });
    addCSV(["Authentication server (Web based) - user registration", "B01", page.url()]);
    await screenshotNoTime({
      test,
      page,
      filename: `C04`,
    });
    addCSV(["Corporate Website (Web based) - User registration + login", "C04", page.url()]);
    // addCSV(["Online Shop", "Authentication - Registration", "h_02", page.url()]);
  });
  test("forget password photo", async () => {
    await goToPage({
      page,
      path: "authentication/forget-password/email",
      type: "customer",
    });
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `B05`,
    });
    addCSV(["Authentication server (Web based) - user management - admins can reset user password", "B05", page.url()]);
    // addCSV(["Online Shop", "Authentication - Forget Password", "h_03", page.url()]);
  });
  // test("Reset Password photo", async () => {
  //   await goToPage({
  //     page,
  //     path: "authentication/reset-password",
  //     type: "customer",
  //   });
  //   await new Promise((r) => setTimeout(r, 2000));
  //   await screenshotNoTime({
  //     test,
  //     page,
  //     filename: `h_04`,
  //   });
  //   addCSV(["Online Shop", "Authentication - Reset Password", "h_04", page.url()]);
  // });
});
