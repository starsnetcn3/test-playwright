import { test, expect } from "@playwright/test";
import goToPage from "../../utils/goToPage";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import checkApi from "../../utils/checkApi";
import addCSV from "../../utils/addCSV";

let pathsData = [
  // TOS
  {
    path: "tos",
    nameList: ["g_14", "g_15", "g_16", "g_17", "g_18", "g_19"],
    titleList: [
      "Static Pages - Edit Terms & Conditions",
      "Static Pages - Edit Privacy Policy",
      "Static Pages - Edit Shipping Policy",
      "Static Pages - Edit Disclaimer",
      "Static Pages - Edit Refund Policy",
      "Static Pages - Edit Payment Terms And Special Fees",
    ],
    categoryList: [
      "Website Management System",
      "Website Management System",
      "Website Management System",
      "Website Management System",
      "Website Management System",
      "Website Management System",
    ],
  },
  // Configuration
  {
    path: "configuration/navbar",
    name: "g_24",
    title: "Page Components - Edit Navigation Bar Component",
    category: "Website Management System",
  },
  {
    path: "configuration/footer",
    name: "g_25",
    title: "Page Components - Edit Footer Component",
    category: "Website Management System",
  },
  // { path: "configuration/landing" },
  {
    path: "configuration/about",
    name: "g_12",
    title: "Static Pages - Edit About Us",
    category: "Website Management System",
  },
  // D12. Shipment Management - Input Tracking Number and Display Delivery Details
  {
    path: "logistics-management/tracking",
    name: "d_12",
    title:
      "Shipment Management - Input Tracking Number and Display Delivery Details",
    category: "Logistics Management System",
  },
  // Contact Us
  {
    path: "contact-us",
    name: "g_13",
    title: "Static Pages - Edit Contact Us",
    category: "Website Management System",
  },
  // Online Shop
  {
    path: "shop/online/category/main/assign",
    name: "c_01",
    createName: "c_02",
    createTitle: " Category Management - Create Category",
    title: "Category Management - Hierarchy",
    category: "Ecommerce Management System",
    editName: "c_05",
    deleteName: "c_04",
    deleteTitle: " Category Management - Delete Category",
    editTitle:
      "Category Management - Edit Category and Assign/Unassign Product",
    editCategory: "Ecommerce Management System",
  },
  // Marketing
  {
    path: "marketing/statistics",
    name: "k_01",
    title: "Sales Funnel Management - Overview",
    category: "Marketing and Affiliation System",
  },
  {
    path: "shop/discount/main",
    name: "c_21",
    title: "Discount Management - Overview of Auto Apply Discount",
    category: "Ecommerce Management System",
  },
  {
    path: "shop/discount/redeemed-voucher",
    name: "c_22",
    title: "Discount Management - Overview of Discount Code",
    category: "Ecommerce Management System",
  },
  {
    path: "shop/discount/promotion-code",
    name: "c_23",
    title: "Discount Management - Overview of Promotion Code",
    category: "Ecommerce Management System",
  },
  // Dashboard
  { path: "dashboard/acquistion", name: "m_01", title: "User analysis - Overview of users growth and their average session duration and hence bounce rate", position: 0, category: "Cloud Big Data Analytics System", },
  { path: "dashboard/engagment", name: "m_02", title: "Traffic analysis - Traffic source/including direct/organically from major search engines/referral from social media. Overview of page visiting views and average retention time", position: 1, category: "Cloud Big Data Analytics System" },
  { path: "dashboard/tech", name: "m_03", title: "Device analysis - Analysis of session by desktop/mobile and tablet and their respective session/bounces and hits", position: 2, category: "Cloud Big Data Analytics System" },
  { path: "dashboard/userAttributes", name: "m_04", title: "Referral analysis - Tracking of referral sources and back-links", position: 3, category: "Cloud Big Data Analytics System" },
  { path: "dashboard/searchConsole", name: "m_05", title: "Geographical analysis - Analysis of unique sessions by geographical location based on IP addresses", position: 5, category: "Cloud Big Data Analytics System" },
  // // Sales and Invoice
  // {
  //   path: "sales-and-invoicing/sales-quotation",
  //   name: "DN",
  //   title: "Sales and Invoicing Management - Sales Quotations",
  // },
  // {
  //   path: "sales-and-invoicing/pricelists",
  //   name: "DO",
  //   title: "Sales and Invoicing Management - Pricelists",
  // },
  // {
  //   path: "sales-and-invoicing/sales-order",
  //   name: "DP",
  //   title:
  //     "Sales and Invoicing Management - Sending Sales Quotation and Sales Orders",
  // },
  // {
  //   path: "sales-and-invoicing/unit-of-measure",
  //   name: "DQ",
  //   title:
  //     "Sales and Invoicing Management - Sales Warnings Sale and Purchase in Different Unit of Measure",
  // },
  // {
  //   path: "sales-and-invoicing/reporting",
  //   name: "DR",
  //   title: "Sales and Invoicing Management - Reporting",
  // },
  // // Accounting and Finance
  // {
  //   path: "accounting-and-finance/chart-of-account",
  //   name: "DS",
  //   title: "Accounting and Finance Management - Chart of Accounts",
  // },
  // {
  //   path: "accounting-and-finance/fiscal-position",
  //   name: "DT",
  //   title: "Accounting and Finance Management - Fiscal Positions",
  // },
  // {
  //   path: "accounting-and-finance/list-of-accounting-journals",
  //   name: "DU",
  //   title: "Accounting and Finance Management - Journals",
  // },
  // {
  //   path: "accounting-and-finance/journal-details",
  //   name: "DV",
  //   title: "Accounting and Finance Management - Journal Types",
  // },
  // {
  //   path: "accounting-and-finance/list-of-intercoms",
  //   name: "DW",
  //   title: "Accounting and Finance Management - Intercoms",
  // },
  // {
  //   path: "accounting-and-finance/list-of-payment-terms",
  //   name: "DX",
  //   title: "Accounting and Finance Management - Payment Terms",
  // },
  // {
  //   path: "accounting-and-finance/payment-follow-up-settings",
  //   name: "DY",
  //   title: "Accounting and Finance Management - Payment Follow Ups",
  // },
  // {
  //   path: "accounting-and-finance/fiscal-year",
  //   name: "DZ",
  //   title: "Accounting and Finance Management - Fiscal Year",
  // },
  // {
  //   path: "accounting-and-finance/budgetary-position",
  //   name: "EA",
  //   title: "Accounting and Finance Management - Budgetary Positions",
  // },
  // {
  //   path: "accounting-and-finance/deferred-revenue-details",
  //   name: "EB",
  //   title: "Accounting and Finance Management - Deferred Revenue Management",
  // },
  // {
  //   path: "accounting-and-finance/all-assets",
  //   name: "EC",
  //   title: "Accounting and Finance Management - Asset Management",
  // },
  // {
  //   path: "accounting-and-finance/analytical-accounting",
  //   name: "EF",
  //   title: "Accounting and Finance Management - Analytical Accounting",
  // },
  // {
  //   path: "accounting-and-finance/all-budgets",
  //   name: "EG",
  //   title: "Accounting and Finance Management - Budget Management",
  // },
  // {
  //   path: "accounting-and-finance/all-invoices",
  //   name: "EH",
  //   title: "Accounting and Finance Management - Customer Invoice to Payments",
  // },
  // {
  //   path: "accounting-and-finance/balance-sheet",
  //   name: "EI",
  //   title: "Accounting and Finance Management - Reporting",
  // },
  // {
  //   path: "accounting-and-finance/reconciliation-model",
  //   name: "EJ",
  //   title: "Accounting and Finance Management - Reconciliation Models",
  // },
  // {
  //   path: "accounting-and-finance/exchange-gain-and-loss-journals",
  //   name: "EK",
  //   title: "Accounting and Finance Management - Exchange Gain or Less Journal",
  // },
  // // CRM
  // {
  //   path: "crm/lead/details?is_lost=1",
  //   name: "EL",
  //   title: "Customer Relationship Management - Managing Lost Opportunities",
  // },
  // {
  //   path: "crm/lead/details",
  //   name: "EM",
  //   title:
  //     "Customer Relationship Management - Lead Acquirement and Operation on Leads",
  // },
  // {
  //   path: "crm/sales-team",
  //   name: "EN",
  //   pageWait: true,
  //   title: "Customer Relationship Management - Sales Team Management",
  // },
  // {
  //   path: "crm/scoring-rule",
  //   name: "EO",
  //   title: "Customer Relationship Management - Scoring Rules",
  // },
];

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

pathsData.forEach(async (pathData) => {
  if (pathData.path === 'dashboard') {
    test(`Get static photo path=${pathData.position}`, async () => {
      await goToPageWaiting({ page, path: pathData.path, type: "admin" });
      await page.locator("a#sc-sidebar-main-toggle").first().click();
      await page.locator("a#sc-sidebar-main-toggle").first().click();
      // 定位您想要截取的部分
      const element = page.locator('div.uk-card').nth(pathData.position); // 替换为实际元素的选择器
      await new Promise((r) => setTimeout(r, 2000));
      // 截取该元素的部分并保存为图片
      await element.screenshot({
        path: `output/${pathData.name}.png`,
        fullPage: false,
      });
      // await screenshotNoTime({
      //   test,
      //   page,
      //   filename: pathData.name,
      //   viewPage: true,
      // });
      addCSV([pathData.category, pathData.title, pathData.name, page.url()]);

    });
  }
  else {
    test(`Get static photo path=${pathData.path}`, async () => {
      await goToPageWaiting({ page, path: pathData.path, type: "admin" });
      switch (pathData.path) {
        case "tos":
          test.slow();
          const navItems = await page.locator("li.nav-item");
          const navItemsCount = await navItems.count();
          for (let i = 0; i < navItemsCount; i++) {
            await navItems
              .nth(i)
              .click()
              .then(async () => {
                if (i > 0) {
                  await checkApi({ page, url: "/api" });
                }
              });
            await new Promise((r) => setTimeout(r, 2000));
            await screenshotNoTime({
              test,
              page,
              filename: pathData.nameList[i],
              viewPage: true,
            });
            addCSV([
              pathData.categoryList[i],
              pathData.titleList[i],
              pathData.nameList[i],
              page.url(),
            ]);
          }
          break;
        case "shop/online/category/main/assign":
        case "configuration/navbar":
        case "configuration/footer":
          await expect(
            page.locator("div.sc-task-board-wrapper").first()
          ).toBeVisible();
          await new Promise((r) => setTimeout(r, 3000));
          await screenshotNoTime({
            test,
            page,
            filename: pathData.name,
            viewPage: true,
          });
          addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
          if (pathData.path == "shop/online/category/main/assign") {
            // 创建截图
            const createBtn = await page
              .locator("a.sc-fab.sc-fab-large.sc-fab-primary")
              .first();
            await createBtn.click();
            await new Promise((r) => setTimeout(r, 2000));
            await screenshotNoTime({
              test,
              page,
              filename: pathData.createName,
              viewPage: true,
            });
            addCSV([
              pathData.editCategory,
              pathData.createTitle,
              pathData.createName,
              page.url(),
            ]);
            await page.getByRole("button", { name: "cancel" }).click();
            // 删除截图
            const deleteBtn = await page
              .locator("i.mdi.mdi-trash-can.sc-icon-18")
              .first();
            await deleteBtn.click();
            // await expect(page.getByLabel("search").first()).toBeVisible();
            await new Promise((r) => setTimeout(r, 1000));
            await screenshotNoTime({
              test,
              page,
              filename: pathData.deleteName,
              viewPage: true,
            });
            addCSV([
              pathData.editCategory,
              pathData.deleteTitle,
              pathData.deleteName,
              page.url(),
            ]);
            await page.getByRole("button", { name: "cancel" }).click();
            const editBtn = await page
              .locator("i.mdi.mdi-pencil.sc-icon-18")
              .first();
            await editBtn.click();
            await expect(page.getByLabel("search").first()).toBeVisible();
            await new Promise((r) => setTimeout(r, 2000));
            await screenshotNoTime({
              test,
              page,
              filename: pathData.editName,
              viewPage: true,
            });
            addCSV([
              pathData.editCategory,
              pathData.editTitle,
              pathData.editName,
              page.url(),
            ]);
          }
          break;
        case "contact-us":
          test.slow();
          await expect(page.locator("div.uk-card").first()).toBeVisible();
          await page.locator("i.mdi-pencil").first().click();
          await new Promise((r) => setTimeout(r, 5000));
          await screenshotNoTime({
            test,
            page,
            filename: pathData.name,
            viewPage: true,
          });
          addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
          break;
        case "crm/sales-team":
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await page.locator("a#sc-sidebar-main-toggle").first().click();
          await new Promise((r) => setTimeout(r, 3000));
          await screenshotNoTime({
            test,
            page,
            filename: pathData.name,
            viewPage: true,
          });
          addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
          break;
        default:
          await expect(
            page.locator("div.sc-top-bar-content").first()
          ).toBeVisible();
          if (pathData.path.includes("shop/discount/")) {
            const refreshBtn = await page.getByRole("button", { name: "refresh" });
            await refreshBtn.click();
          }

          await new Promise((r) => setTimeout(r, 3000));
          await screenshotNoTime({
            test,
            page,
            filename: pathData.name,
            viewPage: true,
          });
          addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
          break;
      }
    });
  }
});
