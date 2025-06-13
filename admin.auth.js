import { test as setup } from "@playwright/test";
import checkApi from "./utils/checkApi";

const authFile = ".auth/admin.json";

setup("Admin Authentication", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("/en/@app/authentication/login");
  await new Promise((r) => setTimeout(r, 2000));

  let inputs = page.locator("input.uk-input");

  await inputs.nth(0).fill("su@starsnet.com.hk");
  await inputs.nth(1).fill("Password12345");
  await new Promise((r) => setTimeout(r, 2000));

  await page
    .locator("button.sc-button")
    .first()
    .click()
    .then(async () => {
      await checkApi({ page, url: "/api" });
    });

  await page.context().storageState({ path: authFile });
});
