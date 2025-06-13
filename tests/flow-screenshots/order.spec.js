require("dotenv").config();
const { test, expect } = require("@playwright/test");
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { testBtnByName, testUploadBtn } from "../../utils/button";
import { randomStr } from "../../utils/random";
import screenshotNoTime from "../../utils/screenshotNoTime";
import addCSV from "../../utils/addCSV";
import Chance from "chance";
const chance = new Chance();

let adminPage;
let customerPage;

const adminUrl = "https://noface.admin.starsnet.hk/en/@app";
const customerUrl = "https://noface.customer.starsnet.hk";

test.beforeAll(async ({ browser }) => {
  customerPage = await browser.newPage();
  adminPage = await browser.newPage();
});

// 选择购物车商品的数量
async function testSelect2({ page, nth }) {
  const selects = await page.locator(".select2-container").nth(nth);
  const selectResults = await page.locator("id=select2--results");
  await selects.click();
  await selectResults
    .nth(0)
    .locator("li.select2-results__option")
    .nth(4)
    .click();
}
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

class Customer {
  // 客户端注册
  async register() {
    await customerPage.goto(`${customerUrl}/authentication/register/email`);
    await new Promise((r) => setTimeout(r, 2000));
    let inputs = customerPage.locator("input.form-control");
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
    // console.log("https://yuenlukluk.customer.starsnet.hk/", randomName.toLowerCase());
    // // 创建电邮地址
    // let email = `${randomName.toLowerCase()}${randomNumber}@gmail.com`;
    // await inputs.nth(0).fill(chance.email({ domain: "gmail.com" }));
    // await inputs.nth(1).fill(chance.name());
    await inputs.nth(0).fill(email);
    await inputs.nth(1).fill(username);
    await inputs.nth(2).fill("Password12345");
    await inputs.nth(3).fill("Password12345");
    await customerPage
      .getByRole("button", { name: "Create An Account" })
      .first()
      .click()
      .then(async () => {
        await checkApi({ page: customerPage, url: "/api" });
      });
    // Wait for the rest of the APIs to finish
    await new Promise((r) => setTimeout(r, 2000));
  }
  // 客户端退出
  async logout() {
    await customerPage.goto(`${customerUrl}/`);
    const userBtn = await customerPage.locator("div.icon-nav > ul > li").nth(1);
    await userBtn.hover();
    await customerPage
      .getByRole("button", { name: "Logout" })
      .first()
      .click()
      .then(async () => {
        await checkApi({ page: customerPage, url: "/api" });
      });
    await new Promise((r) => setTimeout(r, 3000));
  }
  /**
   * 下单离线订单，最后处在支付成功页面
   * @param {Boolean} more more参数：是否开启刷单(刷单商品数为88)，默认false
   */
  async placeOfflineOrder({ more = false }) {
    // 添加商品
    await customerPage.goto(`${customerUrl}/shop/main/cart`);
    await customerPage.reload()
    let addProductBtn = await customerPage.locator("div.btn-cart").nth(0); // 添加商品按钮
    let completeBtn = await customerPage.locator("button.btn.btn-solid.mt-2"); // 点击完成按钮
    await addProductBtn.click();
    await completeBtn.click();
    test.slow();
    if (more) {
      await new Promise((r) => setTimeout(r, 3000));
      const productNumSelector = await customerPage
        .locator(".form-control.mr-2")
        .first();
      await productNumSelector.click();
      // await productNumSelector.selectOption({ index: 30 });
      await productNumSelector.selectOption({ index: 20 });
    }
    await customerPage.locator("th.vgt-checkbox-col input").first().click(); // 选中商品
    await new Promise((r) => setTimeout(r, 3000));
    // 选择送货方式为面对面交易
    const shoppingSeletor = await customerPage.locator("//div[2]/div/select");
    await shoppingSeletor.click();
    await shoppingSeletor.selectOption({ index: 2 });
    // 填写发货详情
    const nameInput = await customerPage.locator(
      "input#name[placeholder='Name']"
    );
    const phoneInput = await customerPage.locator(
      "input#name[placeholder='Phone']"
    );
    const emailInput = await customerPage.locator(
      "input#email[placeholder='Email']"
    );
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
    // await emailInput.fill(chance.email({ domain: "gmail.com" }));
    await emailInput.fill(email);
    // await nameInput.fill(chance.name());
    await nameInput.fill(username);
    await phoneInput.fill(generateRandomNumber());
    // 选择离线支付按钮，离线支付
    await customerPage.locator("label.custom-control-label").nth(1).click(); // 选择离线支付
    await new Promise((r) => setTimeout(r, 2000));
    await customerPage
      .getByRole("button", { name: "PLACE ORDER" })
      .first()
      .click(); // 点击支付按钮
    await expect(
      customerPage.locator("text=VIEW ORDERS").first()
    ).toBeVisible();
    await customerPage.locator("text=VIEW ORDERS").first().click(); // 点击按钮，去到account页面
    await customerPage.getByRole("tab", { name: "My Orders" }).click(); // 进入我的订单
    await expect(customerPage.locator("td img").first()).toBeVisible();
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `h_21`,
    });
    addCSV(["Online Shop", "Orders - Overview", "h_21", customerPage.url()]);
    await customerPage.locator("a.text-break").first().click();
    await expect(
      customerPage.locator("button.btn.btn-solid").first()
    ).toBeVisible();
    const currentUrl = customerPage.url();
    let orderId = currentUrl.split("shop/main/order/")[1];
    return orderId;
  }

  /**
   * 普通商城购买商品，最后在支付成功页面
   * @param {Boolean} more more参数：是否开启刷单(刷单商品数为88)，默认false
   */
  async placeOfflineOrderInMainStore({ more = false }) {
    await goToPage({
      page: customerPage,
      path: "shop/main/product",
      type: "customer",
    });
    // 添加一个商品到购物车（为后面购物车截图做准备）
    // await customerPage.locator("div.btn-cart").first().click();
    // await customerPage
    //   .getByRole("button", { name: "CONTINUE SHOPPING" })
    //   .first()
    //   .click();
    await customerPage.locator("div.img-wrapper").first().click(); // 进入商品详情
    await expect(
      customerPage.locator("div.swiper-wrapper").first()
    ).toBeVisible();
    // 添加商品到购物车
    const addCarBtn = await customerPage
      .locator("button.btn.btn-outline.mr-2")
      .first();
    await addCarBtn.click();
    await expect(
      customerPage.locator("div.media.row.py-4 img").first()
    ).toBeVisible();
    // 前往购物车页面
    await goToPage({
      page: customerPage,
      path: "shop/main/cart",
      type: "customer",
    });
    test.slow();
    if (more) {
      await new Promise((r) => setTimeout(r, 5000));
      const productNumSelector = await customerPage
        .locator(".form-control.mr-2")
        .first();
      await productNumSelector.click();
      await productNumSelector.selectOption({ index: 30 });
    }
    await new Promise((r) => setTimeout(r, 3000));
    // 选择送货方式为面对面交易
    const shoppingSeletor = await customerPage.locator("//div[2]/div/select");
    await shoppingSeletor.click();
    await shoppingSeletor.selectOption({ index: 2 });
    // 填写发货详情
    const nameInput = await customerPage.locator(
      "input#name[placeholder='Name']"
    );
    const phoneInput = await customerPage.locator(
      "input#name[placeholder='Phone']"
    );
    const emailInput = await customerPage.locator(
      "input#email[placeholder='Email']"
    );
    await emailInput.fill(chance.email({ domain: "gmail.com" }));
    await nameInput.fill(chance.name());
    await phoneInput.fill(generateRandomNumber());
    // 选择离线支付按钮，离线支付
    await customerPage.locator("label.custom-control-label").nth(1).click(); // 选择离线支付
    // 离线支付
    await customerPage
      .getByRole("button", { name: "PLACE ORDER" })
      .first()
      .click();
    await expect(
      customerPage.locator("text=VIEW ORDERS").first()
    ).toBeVisible();
  }

  // --代金卷--
  // 客户购买端代金卷截图
  async buyVoucher() {
    // 进入代金卷页面
    await customerPage.goto(`${customerUrl}/shop/voucher`);
    await customerPage.reload()
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `j_01`,
    });
    addCSV([
      "Voucher Shop",
      "Vouchers - Overview/Filter/Sort Voucher",
      "j_01",
      customerPage.url(),
    ]);
    // 进去代金卷详情
    await customerPage.locator("div.img-wrapper").first().click();
    await expect(
      customerPage.locator("img.img-fluid.w-100.border-rounded").first()
    ).toBeVisible();
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `j_02`,
    });
    addCSV([
      "Voucher Shop",
      "Vouchers - Voucher Details with Discount Type/Value and Valid Duration",
      "j_02",
      customerPage.url(),
    ]);
    // 点击buy now按钮(需要有积分才能购买代金卷成功，先完成一些订单才能有积分)
    await customerPage.locator("button.btn.btn-outline").first().click();
    await expect(customerPage.locator("div.media img").first()).toBeVisible();
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `j_03`,
      viewPage: true,
    });
    addCSV(["Voucher Shop", "Vouchers - Redeem Voucher", "j_03", customerPage.url()]);
    await customerPage.locator("button.btn.btn-solid.mr-2").first().click();
    // 我的代金卷页面
    await customerPage.locator("text=VIEW ORDERS").first().click();
    await customerPage.getByRole("tab", { name: "My Vouchers" }).click();
    await expect(
      customerPage.locator("a img.img-fluid.square").first()
    ).toBeVisible();
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `j_04`,
    });
    addCSV(["Voucher Shop", "Redeemed Vouchers - Overview", "j_04", customerPage.url()]);
    // 兑换优惠券 - 详情
    await customerPage.locator("a img.img-fluid.square").first().click();
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `j_05`,
    });
    addCSV(["Voucher Shop", " Redeemed Vouchers - Detail", "j_05", customerPage.url()]);
  }

  // 客户退款
  async returnOrder({ orderId = "" }) {
    await customerPage.goto(`${customerUrl}/account/main-store-order`);
    await customerPage.reload()
    await customerPage.locator("a.text-break").click()
    await expect(customerPage.getByRole("button", { name: "Rate Products" }).first()).toBeVisible();
    await customerPage.getByRole("button", { name: "return order" }).click()
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `h_24`,
      viewPage: true,
    });
    addCSV(["Online Shop", "Orders - Select Product for Refund and Choice of Refund Reasons", "h_24", customerPage.url()]);
    // 定位单选框并点击
    const radioButton = customerPage.locator('input[type="checkbox"]'); // 替换为实际选择器
    await radioButton.first().click();
    //  const element1 = await customerPage.locator("select.form-control.mr-2")
    const productNumSelector = await customerPage
      .locator("select.form-control.mr-2")
      .nth(2)
    await productNumSelector.click();
    await productNumSelector.selectOption({ index: 3 });

    await customerPage.getByRole("button", { name: "submit" }).click()
  }

  async displayOrder({ orderId = "" }) {
    await customerPage.goto(`${customerUrl}/account/main-store-order`);
    await customerPage.reload()
    await customerPage.locator("a.text-break").click()
    await expect(customerPage.getByRole("button", { name: "Rate Products" }).first()).toBeVisible();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `h_25`,
      // viewPage: true,
    });
    addCSV(["Online Shop", " Orders - Display Refund Status and Reason", "h_25", customerPage.url()]);
  }
  // -- 会员商城--
  // 客户端购买会员商城的第一件商品截图(积分商品)
  async buyInMiniShop() {
    // 进入会员商店
    await customerPage.goto(`${customerUrl}/shop/mini/product`);
    await customerPage.reload()
    await expect(customerPage.locator("a img").first()).toBeVisible();
    await new Promise((r) => setTimeout(r, 8000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_01`,
    });
    addCSV(["Member’s Shop", "Categories - Hierarchy Overview", "i_01", customerPage.url()]);
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_02`,
    });
    addCSV([
      "Member’s Shop",
      "Products - Overview/Search/Filter and Sort Product",
      "i_02",
      customerPage.url(),
    ]);
    // 进入商品详情
    await customerPage.locator("div.img-wrapper").first().click();
    await expect(
      customerPage.locator("div.swiper-wrapper").first()
    ).toBeVisible();
    await new Promise((r) => setTimeout(r, 10000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_03`,
    });
    addCSV([
      "Member’s Shop",
      "Products - Product Details/Ratings/Reviews/Add to Wishlist and Recommendation of Products",
      "i_03",
      customerPage.url(),
    ]);
    // 添加商品
    await customerPage
      .getByRole("button", { name: " ADD TO CART " })
      .first()
      .click();
    await expect(
      customerPage.locator("div.media.row.py-4 img").first()
    ).toBeVisible();
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_04`,
      viewPage: true,
    });
    addCSV(["Member’s Shop", "Products - Add to Cart", "i_04", customerPage.url()]);
    // 进入购物车
    await customerPage.locator("a.btn.btn-outline.mr-2.mt-2").first().click();
    await expect(
      customerPage.locator("img.img-fluid.square").first()
    ).toBeVisible();
    test.slow();
    await new Promise((r) => setTimeout(r, 5000));
    // 选择送货方式为面对面交易
    const shoppingSeletor = await customerPage.locator("//div[2]/div/select");
    await shoppingSeletor.click();
    await shoppingSeletor.selectOption("Face-to-Face Pickup");
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_05`,
    });
    addCSV(["Member’s Shop", "Checkout - Choice of Shipping Options", "i_05", customerPage.url()]);
    // 填写发货详情
    const nameInput = await customerPage.locator(
      "input#name[placeholder='Name']"
    );
    const phoneInput = await customerPage.locator(
      "input#name[placeholder='Phone']"
    );
    const emailInput = await customerPage.locator(
      "input#email[placeholder='Email']"
    );
    await emailInput.fill(chance.email({ domain: "gmail.com" }));
    await nameInput.fill(chance.name());
    await phoneInput.fill(generateRandomNumber());
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_06`,
    });
    addCSV([
      "Member’s Shop",
      "Checkout - Input Shipping Details and Display Order Calculations",
      "i_06",
      customerPage.url(),
    ]);
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_07`,
    });
    addCSV([
      "Member’s Shop",
      "Payment (Online) - Choice of Payment Methods",
      "i_07",
      customerPage.url(),
    ]);
    await customerPage
      .getByRole("button", { name: "PLACE ORDER" })
      .first()
      .click(); // 点击支付按钮
    await new Promise((r) => setTimeout(r, 4000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_08`,
    });
    addCSV([
      "Member’s Shop",
      "Payment (Online) - Instant Confirmation of Order",
      "i_08",
      customerPage.url(),
    ]);
    const viewOrderBtn = await customerPage.locator("text=VIEW ORDERS").first();
    // await expect(viewOrderBtn).toBeVisible();

    // 进入我的会员商店订单页面
    await viewOrderBtn.click();
    // a_01
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `a_01`,
    });
    addCSV([
      "Membership System",
      "Account Management - Member Profile Details",
      "a_01",
      customerPage.url(),
    ]);
    await customerPage.getByRole("tab", { name: "Membership", exact: true }).click();
    // await customerPage.goto(`${customerUrl}/account/membership`);
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `a_06`,
    });
    addCSV([
      "Membership System",
      "Membership Points Management - Overview of Membership Points and Transactions",
      "a_06",
      customerPage.url(),
    ]);
    await customerPage.getByRole("tab", { name: "Address Book" }).click();
    // await customerPage.goto(`${customerUrl}/account/membership`);
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `a_02`,
    });
    addCSV([
      "Membership System",
      "Account Management - Address Book",
      "a_02",
      customerPage.url(),
    ]);
    await customerPage.getByRole("tab", { name: "Contact Preferences" }).click();
    // await customerPage.goto(`${customerUrl}/account/membership`);
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `a_03`,
    });
    addCSV([
      "Membership System",
      "Account Management - Contact Preference/Language Preference/Notification Settings",
      "a_03",
      customerPage.url(),
    ]);
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `l_11`,
    });
    addCSV([
      "Notification System",
      "View and Edit notification settings of Members",
      "l_11",
      customerPage.url(),
    ]);
    await customerPage.getByRole("tab", { name: "Change Email" }).click();
    // await customerPage.goto(`${customerUrl}/account/membership`);
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `a_04`,
    });
    addCSV([
      "Membership System",
      "Account Management - Change of Email",
      "a_04",
      customerPage.url(),
    ]);
    await customerPage.getByRole("tab", { name: "Change Password" }).click();
    // await customerPage.goto(`${customerUrl}/account/membership`);
    await new Promise((r) => setTimeout(r, 3000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `a_05`,
    });
    addCSV([
      "Membership System",
      "Account Management - Change of Password",
      "a_05",
      customerPage.url(),
    ]);
    // await customerPage.goto(`${customerUrl}/account/mini-store-order`);
    await customerPage.getByRole("tab", { name: "Membership Order", exact: true }).click();
    await expect(
      customerPage.locator("//div[@aria-hidden='false']//img").first()
    ).toBeVisible();
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_09`,
    });
    addCSV(["Member’s Shop", "Orders - Overview", "i_09", customerPage.url()]);
    await customerPage.locator("a.text-break").nth(1).click();
    // await expect(
    //   customerPage.locator("button.btn.btn-solid").first()
    // ).toBeVisible();
    // 获取mini订单id
    const currentUrl = customerPage.url();
    let orderId = currentUrl.split("shop/mini/order/")[1];
    // 返回mini订单页面
    // await customerPage.goto(`${customerUrl}/account`);
    // await customerPage.getByRole("tab", { name: "Membership Order" }).click();
    return orderId;
  }
  // 客户端查看会员商城订单截图(需要在我的会员商城订单页面)
  async checkMiniShopOrder(browser) {
    // 点击第一个链接进去订单详情
    await customerPage.goto(`${customerUrl}/account`);
    await customerPage.reload();
    await customerPage.getByRole("tab", { name: "Membership Order", exact: true }).click();
    await customerPage
      .locator("//div[@aria-hidden='false']//a")
      .first()
      .click();
    await expect(customerPage.locator("td img").first()).toBeVisible();
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `i_10`,
    });
    addCSV([
      "Member’s Shop",
      "Orders - Display Products/Calculations/Shipping and Payment Details",
      "i_10",
      customerPage.url(),
    ]);
    await expect(customerPage.locator("a.btn.btn-solid").first()).toBeVisible();
    const printReceiptBtn = await customerPage.$("a.btn.btn-solid");
    const receiptUrl = await printReceiptBtn.getAttribute("href");
    if (receiptUrl) {
      let receiptPage = await browser.newPage();
      await receiptPage.goto(receiptUrl);
      await expect(receiptPage.locator("embed").first()).toBeVisible();
      await new Promise((r) => setTimeout(r, 5000));
      await screenshotNoTime({
        test,
        page: receiptPage,
        filename: `i_11`,
        viewPage: true,
      });
      addCSV([
        "Member’s Shop",
        "Orders - Receipt in PDF Format Member shop",
        "i_11",
        receiptPage.url(),
      ]);
    }
  }

  // --普通商城--
  // 购物车购买普通商城商品，并上传支付凭证
  async buyInMainShopCar({ photo = false }) {
    await this.placeOfflineOrder({ more: true }); // 购物车下单商品
    // this.placeOfflineOrderInMainStore({ more: false }); // 普通商城下单商品
    // await customerPage.locator("text=VIEW ORDERS").first().click(); // 点击按钮，去到account页面
    // await customerPage.getByRole("tab", { name: "My Orders" }).click(); // 进入我的订单
    // await expect(customerPage.locator("td img").first()).toBeVisible();
    // await screenshotNoTime({
    //   test,
    //   page: customerPage,
    //   filename: `CM`,
    // });
    // await customerPage.locator("a.text-break").first().click();
    // await expect(
    //   customerPage.locator("button.btn.btn-solid").first()
    // ).toBeVisible();
    if (photo) {
      await new Promise((r) => setTimeout(r, 5000));
      await screenshotNoTime({
        test,
        page: customerPage,
        filename: `h_22`,
      });
      addCSV([
        "Online Shop",
        "Orders - Display Products/Calculations/Shipping/Payment Details/Comment and Rating",
        "h_22",
        customerPage.url(),
      ]);
      await new Promise((r) => setTimeout(r, 5000));
      await screenshotNoTime({
        test,
        page: customerPage,
        filename: `h_19`,
      });
      addCSV([
        "Online Shop",
        "Payment (Offline) - Upload Bank Deposit Slip",
        "h_19",
        customerPage.url(),
      ]);
    }
    // 上传支付凭证
    await testUploadBtn({
      page: customerPage,
      image: "./dummy/bank_slip.jpeg",
      btnLabel: "UPLOAD PAYMENT PROOF",
    });
    if (photo) {

      await testBtnByName({
        page: customerPage,
        name: "View Payment Record",
        timeout: 30000,
      });
      await new Promise((r) => setTimeout(r, 2000));
      test.slow();
      const refreshBtn = await customerPage.getByRole("button", {
        name: "Refresh",
      });
      if (await refreshBtn.isVisible()) {
        await testBtnByName({
          page: customerPage,
          name: "Refresh",
          timeout: 30000,
        });
      }
      await screenshotNoTime({
        test,
        page: customerPage,
        filename: `h_20`,
        viewPage: true,
      });
      addCSV([
        "Online Shop",
        "Payment (Offline) - Auto Processing and Approval/Disapproval with AI Detection",
        "h_20",
        customerPage.url(),
      ]);
      // 获取订单id
      // await page.goto(`${customerUrl}/account`)
      await customerPage.goto(`${customerUrl}/account`);
      await customerPage.reload();
      await customerPage.getByRole("tab", { name: "My Orders" }).click();
      await customerPage.locator("a.text-break").first().click();
      const currentUrl = customerPage.url();
      let orderId = currentUrl.split("shop/main/order/")[1];
      // 返回mini订单页面
      await customerPage.goto(`${customerUrl}/account/mini-store-order`);
      // await customerPage.getByRole("tab", { name: "Membership Order" }).click();
      return orderId;
    }
  }
  // 普通商城打印收据截图，需要传递brower用于创建页面
  async printReceiptShop(browser) {
    // 跳转到订单页面
    await customerPage.goto(`${customerUrl}/account`);
    await customerPage.reload();
    await customerPage.getByRole("tab", { name: "My Orders" }).click();
    // 进入订单详情
    await customerPage.locator("a.text-break").first().click();
    // 获取rate products按钮，点击后截图弹窗
    await customerPage
      .getByRole("button")
      .getByText(" RATE PRODUCTS ")
      .first()
      .click();
    // await expect(
    //   customerPage.locator("div.front .img-fluid.square.border-rounded").first()
    // ).toBeVisible(); // 有些网站没有图片
    await new Promise((r) => setTimeout(r, 5000));
    await screenshotNoTime({
      test,
      page: customerPage,
      filename: `h_23`,
      viewPage: true,
    });
    addCSV([
      "Online Shop",
      "Orders - Completed Order: Comment and Rate Product in Order",
      "h_23",
      customerPage.url(),
    ]);
    // 获取receipt按钮的href，截图PDF的receipt
    const printReceiptBtn = await customerPage.$("a.btn.btn-solid");
    const receiptUrl = await printReceiptBtn.getAttribute("href");
    if (receiptUrl) {
      let receiptPage = await browser.newPage();
      await receiptPage.goto(receiptUrl);
      await expect(receiptPage.locator("embed").first()).toBeVisible();
      await new Promise((r) => setTimeout(r, 5000));
      await screenshotNoTime({
        test,
        page: receiptPage,
        filename: `h_26`,
        viewPage: true,
      });
      addCSV([
        "Online Shop",
        "Orders - Receipt in PDF Format Online shop",
        "h_26",
        receiptPage.url(),
      ]);
    }
  }
}

class Admin {
  // 后台登录
  async login() {
    await adminPage.goto(`${adminUrl}/authentication/login`);
    await new Promise((r) => setTimeout(r, 2000));

    let inputs = adminPage.locator("input.uk-input");
    await inputs.nth(0).fill("su@starsnet.com.hk");
    await inputs.nth(1).fill("Password12345");
    await testBtnByName({ page: adminPage, name: "Login" });
  }
  // 后台完成前台提交的最新订单截图(main shop的 offline 支付订单)
  async complateOfflineOrder({ photo = false, orderId = "" }) {
    // 去往后台的订单页面
    await adminPage.goto(`${adminUrl}/shop/online/order/main`);
    await expect(adminPage.getByLabel("search").first()).toBeVisible();
    const refreshBtn = await adminPage.getByRole("button", { name: "refresh" });
    await refreshBtn.click();
    if (photo) {
      await expect(adminPage.locator("img").first()).toBeVisible();
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-list-table-phoro`,
      });
    }
    // 点击第一个订单进入详情
    // await adminPage.locator("tr.odd").first().getByRole("link").click();
    await adminPage.goto(
      `${adminUrl}/shop/online/order/details?_id=${orderId}`
    );
    if (photo) {
      await expect(adminPage.locator("td img").first()).toBeVisible();
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-detail-table-phoro`,
      });
    }
    // 点击完成支付按钮
    await expect(
      adminPage.getByRole("button", { name: " Confirm Payment " }).first()
    ).toBeVisible();
    await testBtnByName({ page: adminPage, name: " Confirm Payment " });
    if (photo) {
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-complate-pay-phoro`,
      });
    }
    // 更新状态为已完成
    await testSelect2({ page: adminPage, nth: 0 });
    if (photo) {
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-complate-order-photo`,
      });
    }
  }
  // 后台处理退款
  async HandleOrder({ photo = false, orderId = "" }) {
    // 点击第一个订单进入详情
    // await adminPage.locator("tr.odd").first().getByRole("link").click();
    await adminPage.goto(
      `${adminUrl}/shop/online/order/details?_id=${orderId}`
    );
    await adminPage.locator("a#sc-sidebar-main-toggle").first().click();
    await adminPage.locator("a#sc-sidebar-main-toggle").first().click();
    //  await expect(adminPage.getByLabel("search").first()).toBeVisible();
    // 判断编辑页等待什么元素显示
    await expect(adminPage.getByRole("button", { name: "View Refund Request" }).first()).toBeVisible();
    await expect(adminPage.locator("table.uk-table.uk-table-striped.uk-table-middle.dataTable.no-footer.dtr-inline").first()).toBeVisible();
    await adminPage.getByRole("button", { name: "View Refund Request" }).first().click();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page: adminPage,
      filename: "c_17",
      viewPage: true,
    });
    addCSV(["Ecommerce Management System", "Order Management - Approve/Reject Refund Request ", "c_17", adminPage.url()]);
    //  await adminPage.locator(`input[type="checkbox"][value=${orderId}]`).nth(1).click()
    await adminPage
      .getByPlaceholder('Reply')
      .fill('hallo');
    await adminPage.getByRole("button", { name: "approve" }).first().click();
  }
  // 后台完成前台提交的最新订单截图(mini shop的 offline 支付订单)
  async complateOfflineMiniOrder({ photo = false, miniOrderId }) {
    // 去往后台的订单页面
    await adminPage.goto(`${adminUrl}/shop/online/order/mini`);
    await expect(adminPage.getByLabel("search").first()).toBeVisible();
    const refreshBtn = await adminPage.getByRole("button", { name: "refresh" });
    await refreshBtn.click();
    if (photo) {
      await expect(adminPage.locator("img").first()).toBeVisible();
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-list-table-phoro`,
      });
    }
    // 点击第一个订单进入详情
    // await adminPage.locator("tr.odd").first().getByRole("link").click();
    await adminPage.goto(
      `${adminUrl}/shop/online/order/details?_id=${miniOrderId}`
    );
    if (photo) {
      await expect(adminPage.locator("td img").first()).toBeVisible();
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-detail-table-phoro`,
      });
    }
    // 点击完成支付按钮
    await expect(
      adminPage.getByRole("button", { name: " Confirm Payment " }).first()
    ).toBeVisible();
    await testBtnByName({ page: adminPage, name: " Confirm Payment " });
    if (photo) {
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-complate-pay-phoro`,
      });
    }
    // 更新状态为已完成
    await testSelect2({ page: adminPage, nth: 0 });
    if (photo) {
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `order-complate-order-photo`,
      });
    }
  }
  // 后台审核支付凭证(截图)
  async checkPaymentRecord({ photo = false, orderId }) {
    if (!orderId) {
      // 去往后台的订单页面
      await adminPage.goto(`${adminUrl}/shop/online/order/main`);
      await expect(adminPage.getByLabel("search").first()).toBeVisible();
      // 点击第一个订单进入详情
      await adminPage.locator("tr.odd").first().getByRole("link").click();
    } else {
      // 去往订单页面
      await adminPage.goto(
        `${adminUrl}/shop/online/order/details?_id=${orderId}`
      );
    }
    // if (photo) {
    //   await expect(adminPage.locator("td img").first()).toBeVisible();
    //   await screenshotNoTime({
    //     test,
    //     page: adminPage,
    //     filename: `order-check-payment-record-table-phoro`,
    //   });
    // }
    // 点击审核支付凭证
    // let viewReicptBtn = await adminPage
    //   .getByRole("button", { name: " Confirm Payment " })
    //   .first();
    let viewReicptBtn = await adminPage
      .getByRole("button", { name: " VIEW BANK RECEIPT " })
      .first();
    await expect(viewReicptBtn).toBeVisible();
    await viewReicptBtn.click();
    if (photo) {
      await expect(adminPage.locator("span img").first()).toBeVisible();
      // await new Promise((r) => setTimeout(r, 1000));
      await screenshotNoTime({
        test,
        page: adminPage,
        filename: `c_31`,
        viewPage: true,
      });
      addCSV(["Ecommerce Management System",
        "Payment Gateway (Offline) - AI Detection and Approve/Reject Offline Payment Proof",
        "c_31",
        adminPage.url(),
      ]);
    }
    // 点击审核通过
    await adminPage.getByRole("button", { name: " APPROVE " }).first().click();
    // 修改订单状态为完成
    await adminPage.locator("button.close").first().click(); // 关闭弹窗
    await testSelect2({ page: adminPage, nth: 0 });
  }
}

// @自动刷单后获取积分购买优惠卷截图
test.describe.serial("voucher buy screenshots", () => {
  const customer = new Customer();
  const admin = new Admin();
  let orderId;

  test("Customer: Register", async () => {
    await customer.register();
  });
  test("customer place offline order", async () => {
    orderId = await customer.placeOfflineOrder({ more: true });
  });

  test("Admin: Login", async () => {
    await admin.login();
  });
  test("admin complate order", async () => {
    await admin.complateOfflineOrder({ photo: false, orderId });
  });
  test("customer returnOrder", async () => {
    await customer.returnOrder({ orderId });
  });
  test("admin Approve/Reject order", async () => {
    await admin.HandleOrder({ photo: false, orderId });
  });
  test("customer displayOrder", async () => {
    await customer.displayOrder({ orderId });
  });
  test("customer buy voucher", async () => {
    await customer.buyVoucher();
  });
});

// @自动刷单获取积分后购买会员商店商品截图
test.describe.serial("mini shop product buy screenshots", () => {
  const customer = new Customer();
  const admin = new Admin();
  let orderId, miniOrderId;

  test("Customer: Register", async () => {
    await customer.register();
  });
  test("customer place offline order", async () => {
    orderId = await customer.placeOfflineOrder({ more: true });
  });
  test("Admin: Login", async () => {
    await admin.login();
  });
  test("admin complate order", async () => {
    await admin.complateOfflineOrder({ photo: false, orderId });
  });
  test("customer buy minishop", async () => {
    miniOrderId = await customer.buyInMiniShop();
  });
  test("admin complate mini order", async () => {
    await admin.complateOfflineMiniOrder({ photo: false, miniOrderId });
  });
  test("customer check mini order", async ({ browser }) => {
    await customer.checkMiniShopOrder(browser);
  });
});

// @下单(main)商品流程截图
test.describe.serial("get shop offline payment screenshots", () => {
  const customer = new Customer();
  const admin = new Admin();
  let orderId;

  test("Customer: Register", async () => {
    await customer.register();
  });
  test("pay and get order screenshots", async () => {
    orderId = await customer.buyInMainShopCar({ photo: true });
  });
  test("Admin: Login", async () => {
    await admin.login();
  });
  test("check payment record", async () => {
    await admin.checkPaymentRecord({ photo: true, orderId });
  });
  test("print receipt", async ({ browser }) => {
    await customer.printReceiptShop(browser);
  });
});

// 多用户刷单脚本
// test.describe.serial("Multi user ordering", async () => {
//   const customer = new Customer();
//   const admin = new Admin();
//   const times = 10; // 刷单次数
//   test("place order", async () => {
//     for (let num = 0; num < times; num++) {
//       await customer.register(); // 新用户注册
//       await customer.placeOfflineOrderInMainStore({}); // 下单
//       await customer.logout(); // 用户登出
//       await admin.login();
//       await admin.complateOfflineOrder({ photo: true });
//     }
//   });
// });

// @test
// test.describe.serial("test", () => {
//   const customer = new Customer();
//   test("Customer: Register", async () => {
//     test.slow();
//     await customer.register();
//     await customer.placeOfflineOrder({});
//   });
// });
