const { test, expect } = require("@playwright/test");
import goToPage from "../../utils/goToPage";
import screenshotNoTime from "../../utils/screenshotNoTime";
import { testBtnByName, testUploadBtn } from "../../utils/button";
import addCSV from "../../utils/addCSV";
import Chance from "chance";
const chance = new Chance();

let page;
console.log("test");

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

// 生成随机电话函数
function generateRandomNumber() {
  // 定义可能的起始数字
  const startDigits = [5, 6, 9];

  // 随机选择一个起始数字
  const firstDigit =
    startDigits[Math.floor(Math.random() * startDigits.length)];

  // 生成剩余的7位数字
  const remainingDigits = Math.floor(Math.random() * 1_000_0000)
    .toString()
    .padStart(7, "0");

  // 组合成8位数字
  return firstDigit + remainingDigits;
}

// 在线支付流程截图
test.describe.serial("online payment screenshot", () => {
  test("product online payment page photo", async () => {
    await goToPage({ page, path: "shop/main/product", type: "customer" });
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page,
      filename: `W10`,
    });
    addCSV(["eCommerce (Web based) - Ecommerce categories", "W10", page.url()]);
    await screenshotNoTime({
      test,
      page,
      filename: `C07`,
    });
    addCSV([
      "Corporate Website (Web based) - Search",
      "C07",
      page.url(),
    ]);
    // 商品列表
    await test.step("product detail", async () => {
      // 添加一个商品到购物车（为后面购物车截图做准备）
      await page.locator("div.btn-cart").nth(2).click();
      await page
        .getByRole("button", { name: "CONTINUE SHOPPING" })
        .first()
        .click();
      await page.locator("div.img-wrapper").nth(0).click(); // 选择进入第二个商品详情
      await expect(page.locator("div.swiper-wrapper").first()).toBeVisible();
      await page.locator("button.btn.like-btn").first().click(); // 点击该商品为喜欢
      await new Promise((r) => setTimeout(r, 5000));
      await screenshotNoTime({
        test,
        page,
        filename: `W04`,
      });
      addCSV([
        "eCommerce (Web based) -  Additional product description tools",
        "W04",
        page.url(),
      ]);
    });
    // 添加商品到购物车
    await test.step("product add card", async () => {
      const addCarBtn = await page
        .locator("button.btn.btn-outline.mr-2")
        .first();
      await addCarBtn.click();
      await expect(
        page.locator("div.media.row.py-4 img").first()
      ).toBeVisible();
      // await new Promise((r) => setTimeout(r, 5000));
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_09`,
      //   viewPage: true,
      // });
      // addCSV(["Online Shop", "Products - Add to Cart", "h_09", page.url()]);
    });
    // 前往购物车页面
    await test.step("go cart", async () => {
      await goToPage({ page, path: "shop/main/cart", type: "customer" });
      await page.reload()
      await new Promise((r) => setTimeout(r, 8000));
      await screenshotNoTime({
        test,
        page,
        filename: `W08`,
      });
      addCSV([
        "eCommerce (Web based) - Payment acquires",
        "W08",
        page.url(),
      ]);
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_11`,
      // }); // 选择付款方式
      // addCSV([
      //   "Online Shop",
      //   "Cart - Overview/Quantities and Calculations",
      //   "h_11",
      //   page.url(),
      // ]);
    });
    // 输入折扣代码 兑换折扣
    await test.step("discount code applied", async () => {
      const codeInput = await page.locator("input#voucher-code").first();
      const removeBtn = await page.locator("button.btn.btn-solid").first();
      await codeInput.fill("CUTPRICE"); // 输入优惠卷
      await removeBtn.click();
      await expect(
        page.locator("i.ti-check.success-icon.text-success").first()
      ).toBeVisible();
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_12`,
      // });
      // addCSV(["Online Shop", "Cart - Input Discount Code", "h_12", page.url()]);
    });
    // 部分结算，选择部分商品
    await test.step("partial billing", async () => {
      const checkBox = await page.locator("th.vgt-checkbox-col input").nth(1);
      await checkBox.click();
      await new Promise((r) => setTimeout(r, 3000));
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_13`,
      // });
      // addCSV(["Online Shop", "Cart - Partial Checkout", "h_13", page.url()]);
      // await checkBox.click();
    });
    // 选择送货方式为面对面交易
    await test.step("choose shipping options", async () => {
      test.slow();
      await new Promise((r) => setTimeout(r, 3000));
      const shoppingSeletor = await page.locator("//div[2]/div/select");
      await shoppingSeletor.click();
      await shoppingSeletor.selectOption({ index: 2 });

      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_14`,
      // });
      // addCSV(["Online Shop", "Checkout - Choice of Shipping Options", "h_14", page.url()]);
    });
    // 填写发货详情
    await test.step("input order detail", async () => {
      const nameInput = await page.locator("input#name[placeholder='Name']");
      const phoneInput = await page.locator("input#name[placeholder='Phone']");
      const emailInput = await page.locator("input#email[placeholder='Email']");
      await emailInput.fill(chance.email({ domain: "gmail.com" }));
      await nameInput.fill(chance.name());
      await phoneInput.fill(generateRandomNumber());
      await new Promise((r) => setTimeout(r, 3000));
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_15`,
      // });
      // addCSV([
      //   "Online Shop",
      //   "Checkout - Input Shipping Details/Choice of Online/Offline Payment Method and Display Order Calculations",
      //   "h_15",
      //   page.url(),
      // ]);
    });
    // 在线支付
    await test.step("online payment", async () => {
      await page.getByRole("button", { name: "PLACE ORDER" }).first().click();
      // await expect(page.locator("div.v-responsive__content")).toBeVisible();
      await new Promise((r) => setTimeout(r, 8000));
      await screenshotNoTime({
        test,
        page,
        filename: `C06`,
      });
      addCSV([
        "Corporate Website (Web based) - Integration with POS/CRM System",
        "C06",
        page.url(),
      ]);

      // await new Promise((r) => setTimeout(r, 5000));
      // await goToPage({ page, path: "result/order/success", type: "customer" });
      // await page.reload()
      // await new Promise((r) => setTimeout(r, 5000));
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `h_17`,
      // });
      // addCSV([
      //   "Online Shop",
      //   "Payment (Online) - Instant Confirmation of Order",
      //   "h_17",
      //   page.url(),
      // ]);
    });
  });
});

// // 查看离线付款方式
// test.describe.serial("offline payment screenshots", () => {
//   test("offline payment photo", async () => {
//     await goToPage({
//       page,
//       path: "account/main-store-order",
//       type: "customer",
//     });
//     // await screenshotNoTime({
//     //   test,
//     //   page,
//     //   filename: `CM`,
//     // });
//     await page.locator("a.btn.btn-solid.mb-0").first().click();
//     await expect(
//       page.getByRole("heading", { name: "Offline Payment Method" })
//     ).toBeVisible();
//     // await expect(
//     //   page.locator("div.col-md-4.mb-4 img.img-fluid").nth(1)
//     // ).toBeVisible();
//     await new Promise((r) => setTimeout(r, 3000));
//     await screenshotNoTime({
//       test,
//       page,
//       filename: `h_18`,
//       viewPage: true,
//     });
//     addCSV(["Online Shop", "Payment (Offline) - Choice of Payment Methods", "h_18", page.url()]);

//   });
// });

// 愿望清单页面截图
test.describe.serial("wishlist screenshots", () => {
  test("wishlist photo", async () => {
    await test.step("add wish", async () => {
      await goToPage({ page, path: "shop/main/product", type: "customer" });
      await page.locator("div.like").first().click(); // 点击该商品为喜欢
    });
    await test.step("wishlist photo", async () => {
      await goToPage({ page, path: "shop/main/wishlist", type: "customer" });
      await new Promise((r) => setTimeout(r, 5000));
      await screenshotNoTime({
        test,
        page,
        filename: `W05`,
      });
      addCSV(["eCommerce (Web based) - Wishlist", "W05", page.url()]);
    });
  });
});
