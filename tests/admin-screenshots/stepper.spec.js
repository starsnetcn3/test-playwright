import { test, expect } from "@playwright/test";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import checkApi from "../../utils/checkApi";
import { testNextBtn } from "../../utils/button";
import addCSV from "../../utils/addCSV";
const PDFImage = require("pdf-image").PDFImage;
const fs = require("fs");

let paths = ["logistics-management/delivery"];

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

paths.forEach((path) => {
  test.describe(path, () => {
    test.describe.configure({ mode: "serial" });

    test(`get stepper photo path=${path}`, async () => {
      await goToPageWaiting({ page, path: path, type: "admin" });
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: `AH-A`,
      //   viewPage: true,
      // });
      // addCSV([
      //   "Shipment Management - Direct Shipment of Order: Selection of Order",
      //   "AH-A",
      //   page.url(),
      // ]);
      await test.step("order details", async () => {
        await testNextBtn({ page, nth: 0 });
        test.slow();
        // await page
        //   .getByPlaceholder("Address ")
        //   .first()
        //   .fill("九龍新蒲崗富源街13號地下");
        await page.locator("span.select2-selection__rendered").nth(2).click();
        await page
          .locator(
            "li.select2-results__option.select2-results__option--highlighted"
          )
          .nth(0)
          .click();
        await page.locator("span.select2-selection__rendered").nth(4).click();
        await page.locator("li.select2-results__option").nth(2).click();
        // await page.getByPlaceholder("Company Name ").first().fill("順豐");
        // await page.getByPlaceholder("Contact Name ").first().fill("曾不凡");
        // await page.getByPlaceholder("Phone ").first().fill("57612319");
        // 拿数据
        // const api = "https://ava-house.backend.starsnet.hk";
        // const apiUrl = `${api}/api/customer/contents/slug/contact-us/latest`;
        // // 发送请求并等待响应
        // const response = await page.request.get(apiUrl);
        // if(response.ok()){
        //   const data = await response.json();
        //   await page
        //   .getByPlaceholder("Address ")
        //   .nth(1)
        //   .fill(data.content.contacts[0].shop_address.en);
        //   await page.getByPlaceholder("Company Name ").nth(1).fill(data.content.company_name.en);
        //   await page.getByPlaceholder("Contact Name ").nth(1).fill("Mike");
        //   await page.getByPlaceholder("Phone ").nth(1).fill(String(data.content.contacts[0].phone));
        //   console.log('data',data);
        // }
        // await page
        //   .getByPlaceholder("Address ")
        //   .nth(1)
        //   .fill("尖沙嘴漆咸道87-105號百利商業中心12樓31號舖");
        // await page.getByPlaceholder("Company Name ").nth(1).fill("豐順");
        // await page.getByPlaceholder("Contact Name ").nth(1).fill("尖沙嘴");
        // await page.getByPlaceholder("Phone ").nth(1).fill("27978286");

        await page.getByRole("textbox", { name: "Amount" }).fill("100");
        await expect(
          page.getByRole("tab", { name: "Order Details" }).first()
        ).toHaveAttribute("aria-selected", "true");
        await screenshotNoTime({
          test,
          page,
          filename: `d_09`,
          viewPage: true,
        });
        // addCSV([
        //   "Shipment Management - Direct Shipment of Order: Selection of Address/Input of Dimensions and Weight and Selection of Courier",
        //   "d_9",
        //   page.url(),
        // ]);
        addCSV([
          "Logistics Management System",
          "Shipment Management - Direct Shipment of Order with address selection and packaging information including dimensions and weight",
          "d_09",
          page.url(),
        ]);
        await page.locator("span.select2-selection__rendered").nth(1).click();
        await page.locator("li.select2-results__option").nth(0).click();

        await screenshotNoTime({
          test,
          page,
          filename: `d_10`,
          viewPage: true,
        });
        // addCSV([
        //   "Shipment Management - Direct Shipment of Order: Selection of Address/Input of Dimensions and Weight and Selection of Courier",
        //   "d_9",
        //   page.url(),
        // ]);
        addCSV([
          "Logistics Management System",
          "Shipment Management - Allow selection of Courier",
          "d_10",
          page.url(),
        ]);
        await test.step("confirmation details", async () => {
          await testNextBtn({ page, nth: 0 });
          await expect(
            page
              .getByRole("tab", {
                name: "Confirmation of Shipment Details",
              })
              .first()
          ).toHaveAttribute("aria-selected", "true");
          // await new Promise((r) => setTimeout(r, 3000));
          // await screenshotNoTime({
          //   test,
          //   page,
          //   filename: `AH-C`,
          //   viewPage: true,
          // });
          // addCSV([
          //   "Shipment Management - Direct Shipment of Order: Confirmation of Shipment",
          //   "AH-C",
          //   page.url(),
          // ]);
          await test.step("place order", async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
              page.getByRole("tab", { name: "Place Order" }).first()
            ).toHaveAttribute("aria-selected", "true");
            // await new Promise((r) => setTimeout(r, 10000));
            // 获取 iframe 元素
            const iframeElement = await page.$("iframe");
            const src = await iframeElement.getAttribute("src");
            const response = await page.request.get(src);
            // 定义保存路径
            const savePath =
              "/home/cn3-starsnet/桌面/test-with-playwright/output/test.pdf";

            // 检查响应状态
            if (response.ok()) {
              // 获取 PDF 内容并保存到文件
              const pdfBuffer = await response.body();
              fs.writeFileSync(savePath, pdfBuffer);
              console.log(`PDF 文件已保存到 ${savePath}`);
              const pdfImage = new PDFImage(savePath, {
                convertOptions: {
                  "-background": "white", // 设置背景颜色为白色
                  "-flatten": true, // 合并背景和页面内容
                  "-density": 900, // 设置图片的分辨率
                },
              });
              //  转换单个页面
              await pdfImage
                .convertPage(0)
                .then(function (imagePath) {
                  console.log("第一页已转换为 PNG 文件:", imagePath);
                  fs.rename(imagePath, `d_11.png`, (err) => {
                    if (err) {
                      console.error("重命名失败:", err);
                    } else {
                      console.log(`图片已重命名为: d_11`);
                    }
                  });
                })
                .catch(function (err) {
                  console.error("转换失败:", err);
                });
              const originalFilePath = "/home/cn3-starsnet/桌面/test-with-playwright/output/test-0.png"
              const newFilePath = "/home/cn3-starsnet/桌面/test-with-playwright/output/d_11.png"

              // 重命名文件
              fs.rename(originalFilePath, newFilePath, (err) => {
                if (err) {
                  console.error(`文件重命名失败: ${err}`);
                } else {
                  console.log("文件重命名成功。");
                }
              });
              // 转换单个页面
              // await pdfImage
              //   .convertPage(0)
              //   .then(function (imagePath) {
              //     console.log("第一页已转换为 PNG 文件:", imagePath);
              //     fs.rename(imagePath, `d_11.png`, (err) => {
              //       if (err) {
              //         console.error("重命名失败:", err);
              //       } else {
              //         console.log(`图片已重命名为: d_11`);
              //       }
              //     });
              //   })
              //   .catch(function (err) {
              //     console.error("转换失败:", err);
              //   });
            } else {
              console.error("无法下载 PDF 文件，状态码:", response.status());
            }
            // await page.goto(`${src}`);
            // 访问 PDF 文件的 URL
            // fs.unlinkSync(htmlPath); // 删除临时文件
            // 创建 PDFImage 实例
            // await new Promise((r) => setTimeout(r, 2000));
            // await screenshotNoTime({
            //   test,
            //   page,
            //   filename: `d_11`,
            //   viewPage: true,
            // });
            addCSV([
              "Logistics Management System",
              "Shipment Management - Generation of packaging slips",
              "d_11",
              page.url(),
            ]);
          });
        });
      });
    });
  });
});
