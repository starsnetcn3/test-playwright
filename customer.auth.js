import { test as setup } from "@playwright/test";
import checkApi from "./utils/checkApi";
import { randomStr } from "./utils/random";
import Chance from "chance";
const chance = new Chance();

const authFile = ".auth/customer.json";

setup("Customer Authentication", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("authentication/register/email");
  await new Promise((r) => setTimeout(r, 2000));

  let inputs = page.locator("input.form-control");
  // 中文姓氏列表
  const surnames = ['Chan', 'Ng', 'Wong', 'Lee', 'Leung', 'Chen'];
  const firstName = chance.first();

  // 随机选择中文姓氏
  const surname = chance.pickone(surnames);

  // 生成随机数字
  const randomNumber = chance.integer({ min: 10, max: 9999 }); // 生成 2-4 位随机数

  // 生成电邮
  const email = `${firstName.toLowerCase()}${surname.toLowerCase()}${randomNumber}@gmail.com`;

  // 生成用户名
  const username = `${firstName} ${surname}`;
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(username);
  // await inputs.nth(0).fill(chance.email({ domain: "gmail.com" }));
  // await inputs.nth(1).fill(chance.name());
  await inputs.nth(2).fill("Password12345");
  await inputs.nth(3).fill("Password12345");

  await page
    .getByRole("button", { name: "Create An Account" })
    .first()
    .click()
    .then(async () => {
      await checkApi({ page, url: "/api" });
    });

  // Wait for Redirect
  await new Promise((r) => setTimeout(r, 2000));
  await page.context().storageState({ path: authFile });
});



// setup("Customer Authentication", async ({ page }) => {
//   // Perform authentication steps. Replace these actions with your own.
//   await page.goto("files");
//   await new Promise((r) => setTimeout(r, 2000));

//   await page.locator("input.input").nth(0).fill('xmq');
//   await page.locator("input.input").nth(1).fill('xmq');

//   await page
//     .locator('input.button')
//     .first()
//     .click()
//     .then(async () => {
//       await checkApi({ page, url: "/api" });
//     });

//   // Wait for Redirect
//   await new Promise((r) => setTimeout(r, 2000));
//   await page.context().storageState({ path: authFile });
// });
