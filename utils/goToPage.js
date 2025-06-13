const { test, expect } = require("@playwright/test");
import screenshot from "./screenshot";

export default async function goToPage({ page, path, type }) {
  if (type == "admin") {
    await page.goto(`/en/@app/${path}`);
    const backburger = page.locator("i.mdi.mdi-backburger").first();
    await expect(backburger).toBeVisible();
    await backburger.click();

    const burger = page.locator("i.mdi-menu").first();
    await expect(burger).toBeVisible();
    if (await page.getByText("error 404").isVisible()) {
      test.skip();
    }
  } else if (type == "customer") {
    await page.goto(`/${path}`);
    const navbar = page.getByRole("banner").first();
    await expect(navbar).toBeVisible();
  }

  await screenshot({ test, page, filename: page.url() });
}
