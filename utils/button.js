const { test, expect } = require("@playwright/test");
import checkApi from "./checkApi";
import screenshot from "./screenshot";

const testSaveBtn = async ({ page, nth = 0 }) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page.getByText("Save").nth(nth);
  await screenshot({ test, page, filename: `${page.url()}-api-request` });
  await btn.click().then(async () => {
    return await checkApi({ page, url: "/api" });
  });
};

const testSaveAsActiveBtn = async ({ page }) => {
  await new Promise((r) => setTimeout(r, 1000));
  await page.getByText("Save as... ").first().click();
  const btn = await page.getByText("Active ").first();
  await screenshot({ test, page, filename: `${page.url()}-api-request` });
  return await btn
    .first()
    .click()
    .then(async () => {
      await checkApi({ page, url: "/api" });
    });
};

const testSaveOrSaveAsActiveBtn = async ({ page }) => {
  await new Promise((r) => setTimeout(r, 1000));

  const saveBtn = page.getByText("Save").first();
  const saveAsActiveBtn = page.getByRole("button", { name: "Save as" }).first();

  if (await saveAsActiveBtn.isVisible()) {
    await saveAsActiveBtn.hover();
    const btn = await page.getByText("Active").first();
    await screenshot({ test, page, filename: `${page.url()}-api-request` });
    return await btn.click().then(async () => {
      await checkApi({ page, url: "/api" });
    });
  } else if (await saveBtn.isVisible()) {
    await screenshot({ test, page, filename: `${page.url()}-api-request` });
    await saveBtn.click().then(async () => {
      return await checkApi({ page, url: "/api" });
    });
  }
};

const testCreateBtn = async ({ page }) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page.getByText("Create").first();
  await screenshot({ test, page, filename: `${page.url()}-api-request` });
  return btn.click().then(async () => {
    return await testSaveBtn({ page });
  });
};

const testDeleteBtn = async ({ page }) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page.getByRole("button").getByText("Delete").first();
  if (!(await btn.isVisible())) {
    test.skip();
  }
  await screenshot({ test, page, filename: `${page.url()}-api-request` });
  await btn.click().then(async () => {
    return await testConfirmDeleteBtn({ page });
  });
};

const testConfirmDeleteBtn = async ({ page }) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page
    .getByRole("button")
    .getByText("Confirm Delete")
    .first();
  await screenshot({ test, page, filename: `${page.url()}-api-request` });
  await btn.click().then(async () => {
    return await checkApi({ page, url: "/api" });
  });
};

const testRefreshBtn = async ({ page, nth = 0 }) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page.getByText("Refresh").nth(nth);
  if (await btn.isVisible()) {
    await screenshot({ test, page, filename: `${page.url()}-api-request` });
    return await btn.click().then(async () => {
      await checkApi({ page, url: "/api" });
    });
  } else {
    test.skip();
  }
};

const testUploadBtn = async ({
  page,
  nth = 0,
  image = "./dummy/image.png",
  btnLabel = "Upload",
}) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page.getByRole("button").getByText(btnLabel);
  if (!(await btn.nth(nth).isVisible()) || (await btn.nth(nth).isDisabled())) {
    test.skip();
  }
  const fileChooserPromise = page.waitForEvent("filechooser");
  await btn.nth(nth).click();
  const fileChooser = await fileChooserPromise;
  await screenshot({ test, page, filename: `${page.url()}-api-request` });
  await fileChooser.setFiles(image).then(async () => {
    await checkApi({ page, url: "/api", timeout: 10000 });
  });
};

const testNextBtn = async ({ page, nth = 0 }) => {
  await new Promise((r) => setTimeout(r, 1000));
  const btn = await page.getByText("Next").nth(nth);
  return await btn.click();
};

const testBtnByName = async ({ page, name, nth = 0, timeout = 5000 }) => {
  const btn = await page.getByRole("button", { name }).nth(nth);
  if (await btn.isVisible()) {
    await screenshot({ test, page, filename: `${page.url()}-api-request` });
    await btn.click().then(async () => {
      await checkApi({ page, url: "/api", timeout });
    });
  } else {
    test.skip();
  }
};

export {
  testSaveBtn,
  testCreateBtn,
  testRefreshBtn,
  testSaveAsActiveBtn,
  testDeleteBtn,
  testUploadBtn,
  testSaveOrSaveAsActiveBtn,
  testNextBtn,
  testBtnByName,
};
