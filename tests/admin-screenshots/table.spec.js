import { test, expect } from "@playwright/test";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import { name, timeout } from "../../playwright.config";
import addCSV from "../../utils/addCSV";

let getPhotoData = [
  // {
  //   path: "staff-roles-and-permission/accounts",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   imgExit: true,
  //   name: "f_01",
  //   createName: "f_02",
  //   ceateTitle: "Staff Management - Create",
  //   editName: "f_03",
  //   deleteName: "f_04",
  //   deleteTitle: "Staff Management - Delete",
  //   title: "Staff Management - Overview",
  //   category: "Ecommerce Management System",
  //   editTitle:
  //     "Staff Management - Edit Staff and Overview of Check-in/Check-out History",
  //   editCategory: "Staff Management System",
  // },
  // {
  //   path: "staff-roles-and-permission/roles",
  //   editLocator: "td img",
  //   name: "f_05",
  //   createName: "f_06",
  //   ceateTitle: "Staff Groups Management - Create",
  //   editName: "f_07",
  //   deleteName: "f_08",
  //   deleteTitle: "Staff Groups Management - Delete",
  //   title: "Staff Groups Management - Overview",
  //   category: "Ecommerce Management System",
  //   editTitle: "Staff Groups Management - Edit Group and Assign/Unassign Staff",
  //   editCategory: "Staff Management System",
  // },
  // {
  //   path: "logistics/courier",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   imgExit: true,
  //   name: "d_01",
  //   createName: "d_02",
  //   ceateTitle: "Courier Management - Create",
  //   editName: "d_03",
  //   deleteName: "d_04",
  //   deleteTitle: "Courier Management - Delete",
  //   title: "Courier Management - Overview",
  //   category: "Logistics Management System",
  //   editTitle: "Courier Management - Edit Courier",
  //   editCategory: "Logistics Management System",
  // },
  // {
  //   path: "logistics/address",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   name: "d_05",
  //   createName: "d_06",
  //   ceateTitle: "Address Management - Create",
  //   editName: "d_07",
  //   deleteName: "d_08",
  //   deleteTitle: "Address Management - Delete",
  //   title: "Address Management - Overview",
  //   category: "Logistics Management System",
  //   editTitle: "Address Management - Edit Address",
  //   editCategory: "Logistics Management System",
  // },
  // {
  //   path: "warehouse/product",
  //   editLocator: "div.ck-editor",
  //   imgExit: true,
  //   name: "c_06",
  //   createName: "c_07",
  //   ceateTitle: "Product Management - Create Product",
  //   editName: "c_08",
  //   title: "Product Management - Overview",
  //   deleteName: "c_09",
  //   searchName: "c_10",
  //   searchTitle: "Product Management - Search Engine",
  //   deleteTitle: "Product Management - Delete Product",
  //   category: "Ecommerce Management System",
  //   editTitle: "Product Management - Edit Product",
  //   editCategory: "Ecommerce Management System",
  // },
  // {
  //   path: "shop/online/order/main",
  //   editLabel: "Image",
  //   imgExit: true,
  //   name: "E01",
  //   editLocator: "td img",
  //   editName: "E04",
  //   title: "Order Management Function - Create and store sales orders",
  //   // category: "Ecommerce Management System",
  //   editTitle:
  //     "Order Management Function - Admin approves the order",
  //   // editCategory: "Ecommerce Management System",
  // },
  // {
  //   path: "warehouse/location",
  //   editLabel: "Image",
  //   name: "c_18",
  //   editName: "c_19",
  //   title: "Warehouse Management - Overview",
  //   category: "Ecommerce Management System",
  //   editTitle: "Warehouse Management - Edit Warehouse and Connect to Shop",
  //   editCategory: "Ecommerce Management System",
  // },
  // // {
  // //   path: "shop/discount/main",
  // //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  // //   imgExit: true,
  // // },
  // {
  //   path: "blog/category",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   imgExit: true,
  //   name: "b_01",
  //   createName: "b_02",
  //   ceateTitle: "Category Management - Create",
  //   editName: "b_03",
  //   deleteName: "b_04",
  //   deleteTitle: "Category Management - Delete",
  //   title: "Category Management - Overview",
  //   category: "Blog Management System",
  //   editTitle:
  //     "Category Management - Edit Category and Assign/Unassign Blog Post",
  //   editCategory: "Blog Management System",
  // },
  // {
  //   path: "blog/post",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   imgExit: true,
  //   name: "b_05",
  //   createName: "b_06",
  //   ceateTitle: "Post Management - Create ",
  //   searchName: "b_09",
  //   searchTitle: "Post Management - Search Engine",
  //   editName: "b_07",
  //   deleteName: "b_08",
  //   deleteTitle: "Post Management - Delete",
  //   title: "Post Management - Overview",
  //   category: "Blog Management System",
  //   editTitle: "Post Management - Edit Post",
  //   editCategory: "Blog Management System",
  // },
  // {
  //   path: "membership/customer",
  //   searchName: "a_09",
  //   searchTitle: "Search Engine - Elastic search engine with Auto indexing for newly created Customers/updates and deletes. Support Multilingual search ",
  //   category: "Membership System",
  // },
  // {
  //   path: "membership/customer-group",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   name: "a_07",
  //   editName: "a_08",
  //   category: "Membership System",
  //   title: "Groups Management - Overview",
  //   editCategory: "Membership System",
  //   editTitle: "Groups Management - Assign/Unassign Member",
  // }, // 该页面的编辑页面需要的请求时间很久，需要修改playwriht.config.js的expect.timeout
  // {
  //   path: "marketing/affiliator",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   imgExit: true,
  //   name: "k_02",
  //   editName: "k_03",
  //   title: "Affiliation Management - Affiliator Overview",
  //   category: "Marketing and Affiliation System",
  //   editTitle: "Affiliation Management - Affiliator Details",
  //   editCategory: "Marketing and Affiliation System",
  // },
  // {
  //   path: "marketing/affiliate-link",
  //   btnLocator: "td.sorting_1 a",
  //   editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
  //   name: "k_04",
  //   editName: "k_05",
  //   title: "Affiliation Management - Active Discount Code Overview",
  //   category: "Marketing and Affiliation System",
  //   editTitle: "Affiliation Management - Active Discount Code Details",
  //   editCategory: "Marketing and Affiliation System",
  // }, // 该页面的编辑页面需要的请求时间很久，需要修改playwriht.config.js的expect.timeout


  {
    path: "shop/online/order/main",
    editLabel: "Image",
    imgExit: true,
    name: "E01",
    editLocator: "td img",
    editName: "E04",
    title: "Order Management Function - Create and store sales orders",
    // category: "Ecommerce Management System",
    editTitle:
      "Order Management Function - Admin approves the order",
    commonList: ["E02", "E03", "E05", "W02"],
    titleList: ["Order Management Function -  Modify and delete sales orders", "Order Management Function - Search and record existing sales orders", "Order Management Function - Make orders into PDF and Excel", "eCommerce (Web based) - Order management"]
    // editCategory: "Ecommerce Management System",
  },

  {
    path: "membership/customer",
    nextPath: "membership/customer-group",
    editLocator: "input.uk-input.sc-vue-input.sc-input-outline",
    imgExit: true,
    name: "H01",  //不需要
    editName: "H04",
    title: "Customer management function - Create and temporarily save customers",
    // category: "Ecommerce Management System",
    editTitle:
      "Customer management function - Client assigns responsible department and staff",
    commonList: ["H02", "H03"],
    titleList: ["Customer management function - Modify and delete customers", "Customer management function - Search and record existing customers"],
    // editCategory: "Ecommerce Management System",
    editCommonList: ["B04"],
    editTitleList: ["Authentication server (Web based) - user management - admins assign different roles to user"]
  },
  {
    path: "warehouse/product",
    editLocator: "div.ck-editor",
    imgExit: true,
    name: "J01",
    editName: "J03",
    title: "Commodity management function - Create and modify and delete products",
    // category: "Ecommerce Management System",
    editTitle:
      "Commodity management function - Create and modify and delete product brands ",
    commonList: ["J04", "J09", "J10", "W03"],
    titleList: ["Commodity management function - Search and record existing products", "Commodity management function - Multi-condition product screening and matching", "Commodity management function - Create product records into PDF and Excel", "eCommerce (Web based) - Product management"],
    // editCategory: "Ecommerce Management System",
    editCommonList: ["J05", "J06", "J07", "J08"],
    editTitleList: ["Commodity management function - Supplier Price Comparison", "Commodity management function - Create and modify and delete product sales commission", "Commodity management function - Create and modify and delete product detail records", "Commodity management function - Create, modify and delete product packaging data records"]
  },

  {
    path: "staff-roles-and-permission/roles",
    imgExit: true,
    name: "M01",
    editLocator: "td img",
    editName: "M07",
    title: "Human resource management function - Create and modify and delete parts",
    // category: "Ecommerce Management System",
    editTitle:
      "Human resource management function - Staff Assignment Departments and Positions",
    commonList: ["M02"],
    titleList: ["Human resource management function - Create and modify and delete jobs"],
    // editCategory: "Ecommerce Management System",
  },
];

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

getPhotoData.forEach((data) => {
  test.describe(data.path, () => {
    test.describe.configure({ mode: "serial" });

    test(`Get table photo path=${data.path}`, async () => {
      await goToPageWaiting({ page, path: data.path, type: "admin" });
      await page.locator("a#sc-sidebar-main-toggle").first().click();
      await page.locator("a#sc-sidebar-main-toggle").first().click();
      await expect(page.getByLabel("search").first()).toBeVisible();
      if (data.name && data.editName) {
        if (data.name == 'k_04') {
          const text = await page.locator("td.sorting_1").first().textContent();
          const cleanedString = text.replace(/\s+/g, '');
          console.log("text,", text)
          if (cleanedString == 'N/A') {
            await page.locator("th.uk-text-nowrap.sorting.sorting_desc").first().click();
          }
        }

        const refreshBtn = await page.getByRole("button", { name: "refresh" });
        await refreshBtn.click();
        // if (data.imgExit) {
        //   await expect(page.locator("img").first()).toBeVisible();
        // } else {
        await new Promise((r) => setTimeout(r, 2000));
        if (data.path == "warehouse/product") {
          await page.locator('text=Discounted Price').first().dblclick();
        }
        // }
        await screenshotNoTime({
          test,
          page,
          filename: data.name,
          viewPage: true,
        });
        addCSV([data.title, data.name, page.url()]);
        // 截取相同的图
        if (data.commonList) {
          for (let i = 0; i < data.commonList.length; i++) {
            await screenshotNoTime({
              test,
              page,
              filename: data.commonList[i],
              viewPage: true,
            });
            addCSV([data.titleList[i], data.commonList[i], page.url()]);
          }
        }

        // addCSV([data.category, data.title, data.name, page.url()]);
        await test.step("Get table edit content", async () => {
          if (data.path == "membership/customer") {
            await goToPageWaiting({ page, path: data.nextPath, type: "admin" });
            await page.locator("a#sc-sidebar-main-toggle").first().click();
            await page.locator("a#sc-sidebar-main-toggle").first().click();
            await expect(page.getByLabel("search").first()).toBeVisible();
          }
          let editBtn = null;
          if (data.btnLocator) {
            editBtn = await page.locator(data.btnLocator).first();
          } else {
            editBtn = await page.locator("tr.odd").first().getByRole("link");
          }
          await editBtn.click();
          // 判断编辑页等待什么元素显示
          if (data.editLocator) {
            await expect(page.locator(data.editLocator).first()).toBeVisible();
            await new Promise((r) => setTimeout(r, 2000));
          }
          if (data.editLabel) {
            await expect(page.getByLabel(data.editLabel).first()).toBeVisible();
          }
          await screenshotNoTime({
            test,
            page,
            filename: data.editName,
            viewPage: true,
          });
          addCSV([data.editTitle, data.editName, page.url()]);

          // 截取相同的图
          if (data.editCommonList) {
            for (let i = 0; i < data.editCommonList.length; i++) {
              await screenshotNoTime({
                test,
                page,
                filename: data.editCommonList[i],
                viewPage: true,
              });
              addCSV([data.editTitleList[i], data.editCommonList[i], page.url()]);
            }
          }
          // addCSV([data.editCategory, data.editTitle, data.editName, page.url()]);
          if (data.name == 'f_01') {
            await screenshotNoTime({
              test,
              page,
              filename: 'l_12',
              viewPage: true,
            });
            addCSV(["Notification System", "View and Edit notification settings of Staff", 'l_12', page.url()]);
          }
          // 截图员工签到签出表
          if (data.path == "staff-roles-and-permission/accounts") {
            await page.locator("table.uk-table.uk-table-striped.uk-table-middle").first().click();
            await screenshotNoTime({
              test,
              page,
              filename: "f_10",
              viewPage: true,
            });
            addCSV(["Staff Management System", "Check-in Management - Overview of Check-in/Check-out History", "f_10", page.url()]);
          }
        });
      }
      if (data.deleteName) {
        // 删除页面截图
        const removeBtn = await page.getByRole("button", { name: "delete" });
        await removeBtn.click();
        await new Promise((r) => setTimeout(r, 2000));
        await screenshotNoTime({
          test,
          page,
          filename: data.deleteName,
          viewPage: true,
        });
        addCSV([data.category, data.deleteTitle, data.deleteName, page.url()]);
      }
      if (data.createName) {
        // 回到开始的页面
        await goToPageWaiting({ page, path: data.path, type: "admin" });
        await page.locator("a#sc-sidebar-main-toggle").first().click();
        await page.locator("a#sc-sidebar-main-toggle").first().click();
        await expect(page.getByLabel("search").first()).toBeVisible();
        const refreshBtn = await page.getByRole("button", { name: "refresh" });
        await refreshBtn.click();
        if (data.path == "warehouse/product") {
          await page.locator('text=Discounted Price').first().dblclick();
        }
        const createBtn = await page.getByRole("button", { name: "create" });
        await createBtn.click();
        if (data.imgExit) {
          await expect(page.locator("img").first()).toBeVisible();
        }
        await new Promise((r) => setTimeout(r, 3000));
        await screenshotNoTime({
          test,
          page,
          filename: data.createName,
          viewPage: true,
        });
        addCSV([data.category, data.ceateTitle, data.createName, page.url()]);
      }
      if (data.searchName) {
        // 搜索截图
        await goToPageWaiting({ page, path: data.path, type: "admin" });
        await page.locator("a#sc-sidebar-main-toggle").first().click();
        await page.locator("a#sc-sidebar-main-toggle").first().click();
        await expect(page.getByLabel("search").first()).toBeVisible();

        // const createBtn = await page.getByRole("button", { name: "create" });
        // await createBtn.click();
        page.locator("input.uk-form-small").first().fill("p");
        if (data.imgExit) {
          await expect(page.locator("img").first()).toBeVisible();
        }
        if (data.path == "warehouse/product") {
          await page.locator('text=Discounted Price').first().dblclick();
        }
        await new Promise((r) => setTimeout(r, 1000));
        await screenshotNoTime({
          test,
          page,
          filename: data.searchName,
          viewPage: true,
        });
        addCSV([data.category, data.searchTitle, data.searchName, page.url()]);
      }
    });


  });
});
