import { test, expect } from "@playwright/test";
import goToPage from "../../utils/goToPage";
import goToPageWaiting from "../../utils/goToPageWaiting";
import screenshotNoTime from "../../utils/screenshotNoTime";
import checkApi from "../../utils/checkApi";
import addCSV from "../../utils/addCSV";

let pathsData = [

    // {
    //     path: "configuration/footer",
    //     name: "g_25",
    //     title: "Page Components - Edit Footer Component",
    //     category: "Website Management System",
    // },
    // // { path: "configuration/landing" },
    // {
    //     path: "configuration/about",
    //     name: "g_12",
    //     title: "Static Pages - Edit About Us",
    //     category: "Website Management System",
    // },
    // // D12. Shipment Management - Input Tracking Number and Display Delivery Details
    // {
    //     path: "logistics-management/tracking",
    //     name: "d_12",
    //     title:
    //         "Shipment Management - Input Tracking Number and Display Delivery Details",
    //     category: "Logistics Management System",
    // },
    // // Contact Us
    // {
    //     path: "contact-us",
    //     name: "g_13",
    //     title: "Static Pages - Edit Contact Us",
    //     category: "Website Management System",
    // },
    // // Online Shop
    // {
    //     path: "shop/online/category/main/assign",
    //     name: "c_01",
    //     createName: "c_02",
    //     createTitle: " Category Management - Create Category",
    //     title: "Category Management - Hierarchy",
    //     category: "Ecommerce Management System",
    //     editName: "c_05",
    //     deleteName: "c_04",
    //     deleteTitle: " Category Management - Delete Category",
    //     editTitle:
    //         "Category Management - Edit Category and Assign/Unassign Product",
    //     editCategory: "Ecommerce Management System",
    // },

    // User management function 
    {
        path: "management/user-management/user-list",
        name: "D01",
        title: "User management function - Create, modify and delete salesperson and administrator users",
        commonList: ["D04"],
        titleList: ["User management function - Immediately terminate user login"]
    },
    {
        path: "management/user-management/user-permission",
        name: "D02",
        title: "User management function - Create, modify and delete user permissions",
    },
    {
        path: "management/user-management/login-history",
        name: "D03",
        title: "User management function - User Login History",
    },
    // {
    //     path: "management/user-management/user-list",
    //     name: "D04",
    //     title: "User management function - Immediately terminate user login",
    // },


    // Quotation management function
    {
        path: "management/sales-and-invoicing/sales-quotation",
        name: "F01",
        title: "Quotation management function - Create and store quotations",
        commonList: ["F02", "F03", "F05"],
        titleList: ["Quotation management function - Modify and delete quotation", "Quotation management function - Search and record existing quotations", "Quotation management function - Make the quotation into PDF and Excel"]
    },
    // {
    //     path: "management/sales-and-invoicing/sales-quotation",
    //     name: "F02",
    //     title: "Quotation management function - Modify and delete quotation",
    // },
    // {
    //     path: "management/sales-and-invoicing/sales-quotation",
    //     name: "F03",
    //     title: "Quotation management function - Search and record existing quotations",
    // },
    {
        path: "management/sales-and-invoicing/quotation-details?id=QT2025002",
        name: "F04",
        title: "Quotation management function -  Admin Approve Quotation",
        commonList: ["F06"],
        titleList: ["Quotation management function - Quotation directly emailed to customer"]
    },
    // {
    //     path: "management/sales-and-invoicing/sales-quotation",
    //     name: "F05",
    //     title: "Quotation management function - Make the quotation into PDF and Excel",
    // },
    // {
    //     path: "management/sales-and-invoicing/quotation-details?id=QT2025002",
    //     name: "F06",
    //     title: "Quotation management function - Quotation directly emailed to customer",
    // },

    // Purchase order management function
    {
        path: "management/purchase-orders/purchase-order-list",
        name: "G01",
        title: "Purchase order management function - Create and store purchase orders",
        commonList: ["G02", "G03", "G05"],
        titleList: ["Purchase order management function - Modify and delete purchase orders", "Purchase order management function - Search and record existing purchase orders", "Purchase order management function - Make the purchase order into PDF and Excel"]
    },
    // {
    //     path: "management/purchase-orders/purchase-order-list",
    //     name: "G02",
    //     title: "Purchase order management function - Modify and delete purchase orders",
    // },
    // {
    //     path: "management/purchase-orders/purchase-order-list",
    //     name: "G03",
    //     title: "Purchase order management function - Search and record existing purchase orders",
    // },
    {
        path: "management/purchase-orders/purchase-order-details",
        name: "G04",
        title: "Purchase order management function -  Admin Approve Purchase Order",
        commonList: ["G06"],
        titleList: ["Purchase order management function - Purchase orders are emailed directly to suppliers"]
    },
    // {
    //     path: "management/purchase-orders/purchase-order-list",
    //     name: "G05",
    //     title: "Purchase order management function - Make the purchase order into PDF and Excel",
    // },
    // {
    //     path: "management/purchase-orders/purchase-order-details",
    //     name: "G06",
    //     title: "Purchase order management function - Purchase orders are emailed directly to suppliers",
    // },

    // Customer management function
    {
        path: "management/sales-and-invoicing/sales-quotation",
        name: "H05",
        title: "Customer management function - Search and record all orders and quotations from customers",
    },
    {
        path: "management/contractsV2/index-contracts",
        name: "H06",
        title: "Customer management function - Search and record all contracts and documents of customers",
    },
    {
        path: "accounting-and-finance/payment-follow-up-settings",
        name: "H07",
        title: "Customer management function - Search and record all customer project follow-up",
        commonList: ["H08"],
        titleList: ["Customer management function - Search and record all customer service follow-ups"]
    },
    // {
    //     path: "accounting-and-finance/payment-follow-up-settings",
    //     name: "H08",
    //     title: "Customer management function - Search and record all customer service follow-ups",
    // },

    // Supplier management function
    {
        path: "management/supplier/supplier-list",
        name: "I01",
        title: "Supplier management function - Create and stash suppliers",
        commonList: ["I02", "I03"],
        titleList: ["Supplier management function - Modify and delete suppliers", "Supplier management function - Search and record existing suppliers"]
    },
    // {
    //     path: "management/supplier/supplier-list",
    //     name: "I02",
    //     title: "Supplier management function - Modify and delete suppliers",
    // },
    // {
    //     path: "management/supplier/supplier-list",
    //     name: "I03",
    //     title: "Supplier management function - Search and record existing suppliers",
    // },
    {
        path: "management/supplier/distribution",
        name: "I04",
        title: "Supplier management function - Goods and Services Distribution Provider",
    },
    {
        path: "management/supplier/department-assignment",
        name: "I05",
        title: "Supplier management function - Supplier assigns responsible department and staff",
    },
    {
        path: "management/supplier/purchase-orders",
        name: "I06",
        title: "Supplier management function - Search and record all purchase orders of suppliers",
    },
    {
        path: "management/supplier/contracts",
        name: "I07",
        title: "Supplier management function - Search and record all contracts and documents of suppliers",
    },
    {
        path: "management/supplier/followup-items",
        name: "I08",
        title: "Supplier management function - Search and record all items of suppliers to follow up",
    },
    {
        path: "management/supplier/customer-service",
        name: "I09",
        title: "Supplier management function - Search and record all customer service follow-ups of suppliers",
    },

    // Commodity inventory function
    {
        path: "management/inventory-management/inventory-list",
        name: "K01",
        title: "Commodity inventory function - Create and modify and delete inventory",
        commonList: ["K02", "K03", "K05"],
        titleList: ["Commodity inventory function - Add, modify and delete commodity inventory records", "Commodity inventory function - Search and record existing inventory records", "Commodity inventory function - Make storage records into PDF and Excel"]
    },
    // {
    //     path: "management/inventory-management/inventory-list",
    //     name: "K02",
    //     title: "Commodity inventory function - Add, modify and delete commodity inventory records",
    // },
    // {
    //     path: "management/inventory-management/inventory-list",
    //     name: "K03",
    //     title: "Commodity inventory function - Search and record existing inventory records",
    // },
    {
        path: "management/inventory-management/barcode-scanner",
        name: "K04",
        title: "Commodity inventory function - Support barcode and QR code",
    },
    // {
    //     path: "management/inventory-management/inventory-list",
    //     name: "K05",
    //     title: "Commodity inventory function - Make storage records into PDF and Excel",
    // },

    // Accounting management function 
    {
        path: "management/accounting-management/bank-accounts",
        name: "L01",
        title: "Accounting management function - Create and modify and delete bank accounts",
        commonList: ["L02", "L08"],
        titleList: ["Accounting management function - Add, modify and delete bank account", "Accounting management function - Bank account record csv import"]
    },
    // {
    //     path: "management/accounting-management/bank-accounts",
    //     name: "L02",
    //     title: "Accounting management function - Add, modify and delete bank account",
    // },
    {
        path: "management/accounting-management/bank-statements",
        name: "L03",
        title: "Accounting management function - Bank account monthly statement record",
        commonList: ["L04"],
        titleList: ["Accounting management function - Make bank account monthly statement records into PDF and Excel"]
    },
    // {
    //     path: "management/accounting-management/bank-statements",
    //     name: "L04",
    //     title: "Accounting management function - Make bank account monthly statement records into PDF and Excel",
    // },
    {
        path: "management/accounting-management/transactions",
        name: "L05",
        title: "Accounting management function - Bank account deposit and withdrawal report",
    },
    {
        path: "management/accounting-management/annual-closing",
        name: "L06",
        title: "Accounting management function - Bank Account Annual Closing Record",
        commonList: ["L07"],
        titleList: ["Accounting management function - Make bank account year-end records into PDF and Excel"]
    },
    // {
    //     path: "management/accounting-management/annual-closing",
    //     name: "L07",
    //     title: "Accounting management function - Make bank account year-end records into PDF and Excel",
    // },
    // {
    //     path: "management/accounting-management/bank-accounts",
    //     name: "L08",
    //     title: "Accounting management function - Bank account record csv import",
    // },

    // Human resource management function 

    {
        path: "management/hr/shift-schedules",
        name: "M03",
        title: "Human resource management function - Create and modify and delete shift schedules",
    },
    {
        path: "management/hr/salary",
        name: "M04",
        title: "Human resource management function - Create and modify and delete salary forms",
    },
    {
        path: "management/hr/disciplinary",
        name: "M05",
        title: "Human resource management function - Create and modify and delete disciplinary forms",
    },
    {
        path: "management/hr/job-openings",
        name: "M09",
        title: "Human resource management function - Create and modify and delete job openings",
    },
    {
        path: "management/hr/candidates",
        name: "M10",
        title: "Human resource management function - Create and modify and delete candidates",
    },
    {
        path: "management/hr/candidate-details",
        name: "M11",
        title: "Human resource management function - Admin Approves Candidates",
    },
    {
        path: "management/hr/attendance",
        name: "M12",
        title: "Human resource management function - Employee attendance record csv/excel import",
        commonList: ["M13"],
        titleList: ["Human resource management function - Create, modify and delete employee attendance records"]
    },
    // {
    //     path: "management/hr/attendance",
    //     name: "M13",
    //     title: "Human resource management function - Create, modify and delete employee attendance records",
    // },
    {
        path: "management/hr/disciplinary-records",
        name: "M14",
        title: "Human resource management function - Create and modify and delete warning letters",
        commonList: ["M15", "M16", "M17"],
        titleList: ["Human resource management function - Warning Letter Email to Employees and Management", "Human resource management function - Create and modify and delete testimonials", "Human resource management function - Commendation Letter Email to Employees and Management"]
    },
    // {
    //     path: "management/hr/disciplinary-records",
    //     name: "M15",
    //     title: "Human resource management function - Warning Letter Email to Employees and Management",
    // },
    // {
    //     path: "management/hr/disciplinary-records",
    //     name: "M16",
    //     title: "Human resource management function - Create and modify and delete testimonials",
    // },
    // {
    //     path: "management/hr/disciplinary-records",
    //     name: "M17",
    //     title: "Human resource management function - Commendation Letter Email to Employees and Management",
    // },
    {
        path: "management/hr/career-documents",
        name: "M18",
        title: "Human resource management function - Create and modify and delete promotion letters",
        commonList: ["M19", "M20", "M21"],
        titleList: ["Human resource management function - Promotion Letter Email to Employees and Management", "Human resource management function - Create and modify and delete recommendation letters", "Human resource management function - Recommendation Letter Email to Employees and Management"]
    },
    // {
    //     path: "management/hr/career-documents",
    //     name: "M19",
    //     title: "Human resource management function - Promotion Letter Email to Employees and Management",
    // },
    // {
    //     path: "management/hr/career-documents",
    //     name: "M20",
    //     title: "Human resource management function - Create and modify and delete recommendation letters",
    // },
    // {
    //     path: "management/hr/career-documents",
    //     name: "M21",
    //     title: "Human resource management function - Recommendation Letter Email to Employees and Management",
    // },
    {
        path: "management/hr/performance",
        name: "M22",
        title: "Human resource management function - Create and modify and delete employee performance records",
    },
    {
        path: "management/human-capital/leave-preview",
        name: "M23",
        title: "Human resource management function - Create, modify and delete employee leave records",
    },
    {
        path: "management/hr/monthly-settlement",
        name: "M24",
        title: "Human resource management function - Monthly settlement automatically calculates salary and commission and MPF records",
        commonList: ["M28"],
        titleList: ["Human resource management function - Search existing salary and MPF records"]
    },
    {
        path: "management/hr/payroll-management",
        name: "M25",
        title: "Human resource management function - Monthly settlement automatic calculation of pay bills",
        commonList: ["M26"],
        titleList: ["Human resource management function - Modify and delete employee payroll"]
    },
    // {
    //     path: "management/hr/payroll-management",
    //     name: "M26",
    //     title: "Human resource management function - Modify and delete employee payroll",
    // },
    {
        path: "management/hr/food-order-details",
        name: "M27",
        title: "Human resource management function - Admin approves food order",
    },
    // {
    //     path: "management/hr/monthly-settlement",
    //     name: "M28",
    //     title: "Human resource management function - Search existing salary and MPF records",
    // },
    {
        path: "management/hr/attendance-scheduling",
        name: "M29",
        title: "Human resource management function - Staff Attendance Scheduling",
    },
    {
        path: "management/hr/attendance-report",
        name: "M30",
        title: "Human resource management function - Monthly and year-end employee attendance report",
    },
    {
        path: "management/hr/salary-report",
        name: "M31",
        title: "Human resource management function - Monthly and year-end employee salary and commission and MPF report",
        commonList: ["M32"],
        titleList: ["Human resource management function - Report creation PDF/Excel"]
    },
    // {
    //     path: "management/hr/salary-report",
    //     name: "M32",
    //     title: "Human resource management function - Report creation PDF/Excel",
    // },

    // Project progress management function
    {
        path: "management/project-management/work-items",
        name: "N01",
        title: "Project progress management function - Create and modify and delete work items",
        commonList: ["N08", "N10"],
        titleList: ["Project progress management function - Create and modify and delete work item progress", "Project progress management function - Search and record existing work items"]
    },
    {
        path: "management/project-management/categories",
        name: "N02",
        title: "Project progress management function - Create and modify and delete work item categories",
    },
    {
        path: "management/project-management/assignments",
        name: "N03",
        title: "Project progress management function - Project assignment responsible department and staff ",
    },
    {
        path: "management/project-management/documents",
        name: "N04",
        title: "Project progress management function - Quote import and delete",
        commonList: ["N05", "N06", "N07"],
        titleList: ["Project progress management function - Contract import and deletion", "Project progress management function -  Import and delete files and files", "Project progress management function - Other media file upload"]
    },
    // {
    //     path: "management/project-management/documents",
    //     name: "N05",
    //     title: "Project progress management function - Contract import and deletion",
    // },
    // {
    //     path: "management/project-management/documents",
    //     name: "N06",
    //     title: "Project progress management function -  Import and delete files and files",
    // },
    // {
    //     path: "management/project-management/documents",
    //     name: "N07",
    //     title: "Project progress management function - Other media file upload",
    // },
    // {
    //     path: "management/project-management/work-items",
    //     name: "N08",
    //     title: "Project progress management function - Create and modify and delete work item progress",
    // },
    {
        path: "management/project-management/progress-reports",
        name: "N09",
        title: "Project progress management function - Create and modify and delete work item progress reports",
    },
    // {
    //     path: "management/project-management/work-items",
    //     name: "N10",
    //     title: "Project progress management function - Search and record existing work items",
    // },
    {
        path: "management/project-management/work-item-report",
        name: "N11",
        title: "Project progress management function - Work item report creation PDF/Excel",
        commonList: ["N12"],
        titleList: ["Project progress management function - Work item reports emailed to clients and managers"]
    },
    // {
    //     path: "management/project-management/work-item-report",
    //     name: "N12",
    //     title: "Project progress management function - Work item reports emailed to clients and managers",
    // },

    // Customer service management function
    {
        path: "management/employee/appointment-booking",
        name: "P01",
        title: "Customer service management function - Create and modify and delete customer service inquiries",
    },
    {
        path: "management/employee/order-management",
        name: "P02",
        title: "Customer service management function - Create, modify and delete customer service follow-up items",
        commonList: ["P03", "P04"],
        titleList: ["Customer service management function - Search and record existing customer service follow-up items", "Customer service management function - Customer service follow-up project assignment responsible department and staff"]
    },
    // {
    //     path: "management/employee/order-management",
    //     name: "P03",
    //     title: "Customer service management function - Search and record existing customer service follow-up items",
    // },
    // {
    //     path: "management/employee/order-management",
    //     name: "P04",
    //     title: "Customer service management function - Customer service follow-up project assignment responsible department and staff",
    // },

    // Conference management function 
    {
        path: "management/conference-management/conferences",
        name: "Q01",
        title: "Conference management function - Create and modify and delete conferences",
    },
    {
        path: "management/conference-management/conferences-assignment",
        name: "Q02",
        title: "Conference management function - Assign and invite departments and employees to join the meeting",
        commonList: ["Q03"],
        titleList: ["Conference management function - Email meeting reminders to notify participants"]
    },
    // {
    //     path: "management/conference-management/conferences-assignment",
    //     name: "Q03",
    //     title: "Conference management function - Email meeting reminders to notify participants",
    // },
    {
        path: "management/conference-management/agenda",
        name: "Q04",
        title: "Conference management function - Create and modify and delete meeting agenda",
    },
    {
        path: "management/conference-management/minutes",
        name: "Q05",
        title: "Conference management function - Create and modify and delete meeting minutes",
        commonList: ["Q08"],
        titleList: ["Conference management function - Search and record existing meeting minutes"]
    },
    {
        path: "management/conference-management/minutes-detail",
        name: "Q06",
        title: "Conference management function - Email meeting minutes to participants",
        commonList: ["Q07"],
        titleList: ["Conference management function - Meeting Minutes Media File Upload"]
    },
    // {
    //     path: "management/conference-management/minutes-detail",
    //     name: "Q07",
    //     title: "Conference management function - Meeting Minutes Media File Upload",
    // },
    // {
    //     path: "management/conference-management/minutes",
    //     name: "Q08",
    //     title: "Conference management function - Search and record existing meeting minutes",
    // },

    // Internal tutorial management function
    {
        path: "management/tutorial-management/tutorials",
        name: "R01",
        title: "Internal tutorial management function - Create and modify and delete internal tutorials",
        commonList: ["R02"],
        titleList: ["Internal tutorial management function - Search and record existing internal tutorials"]
    },
    // {
    //     path: "management/tutorial-management/tutorials",
    //     name: "R02",
    //     title: "Internal tutorial management function - Search and record existing internal tutorials",
    // },
    {
        path: "management/tutorial-management/tutorial-approval-details",
        name: "R03",
        title: "Internal tutorial management function - Admin Approve Internal Tutorials",
    },
    {
        path: "management/tutorial-management/tutorial-assignment",
        name: "R04",
        title: "Internal tutorial management function - Assign and invite departments and employees to use internal tutorials",
    },

    // Data analysis function
    {
        path: "dashboard/acquisition",
        name: "S01",
        title: "Data analysis function - Chart analysis of orders and business data",
    },
    {
        path: "dashboard/engagement",
        name: "S02",
        title: "Data analysis function - Month-end and year-end chart analysis of business data under specified conditions",
    },
    {
        path: "dashboard/search-console",
        name: "S03",
        title: "Data analysis function - Month-end and year-end chart analysis of employee data under specified conditions",
    },

    {
        path: "dashboard",
        name: "W01",
        title: "eCommerce (Web based) - Ecommerce dashboard",
    },

    {
        path: "sales-and-invoicing/pricelists",
        name: "W06",
        title: "eCommerce (Web based) - Pricelists",
    },
    // System security function 
    {
        path: "management/system-security",
        name: "T01",
        title: "System security function - System-wide data encryption",
        commonList: ["T02", "U01"],
        titleList: ["System security function - Full system daily scheduled backup", "System notification function - Real-time Telegram or Whatsapp notification of data changes"]
    },
    // {
    //     path: "management/system-security",
    //     name: "T02",
    //     title: "System security function - Full system daily scheduled backup",
    // },

    // // System notification function
    // {
    //     path: "management/system-security",
    //     name: "U01",
    //     title: "System notification function - Real-time Telegram or Whatsapp notification of data changes",
    // },

    // 老的页面 原先有的 可能要改的

    {
        path: "staff-roles-and-permission/accounts",
        name: "M06",
        title: "Human resource management function - Create and modify and delete employees",
        commonList: ["M08", "B07"],
        titleList: ["Human resource management function - Search existing staff and job records", "Authentication server (Web based) - admins and users themselves can view and manage user sessions"]
    },

    // {
    //     path: "staff-roles-and-permission/accounts",
    //     name: "M08",
    //     title: "Human resource management function - Search existing staff and job records",
    // },
    // {
    //     path: "staff-roles-and-permission/accounts",
    //     name: "B07",
    //     title: "Human resource management function - Search existing staff and job records",
    // },

    {
        path: "shop/online/category/main/assign",
        name: "J02",
        title: "Commodity management function - Create and modify and delete product categories",
    },

    {
        path: "logistics/courier",
        name: "W09",
        title: "eCommerce (Web based) - Shipping methods",
    },
    {
        path: "shop/discount/promotion-code",
        name: "W07",
        title: "eCommerce (Web based) - Promotions and coupon programs",
    }
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
        test(`Get static photo path=${pathData.path}`, async () => {
            await goToPageWaiting({ page, path: pathData.path, type: "admin" });
            await page.locator("a#sc-sidebar-main-toggle").first().click();
            await page.locator("a#sc-sidebar-main-toggle").first().click();
            await new Promise((r) => setTimeout(r, 3000));
            // 定位您想要截取的部分
            // const element = page.locator('div.uk-card').nth(pathData.position); // 替换为实际元素的选择器
            // await new Promise((titleut/${pathData.name}.png`,
            //     fullPage: false,
            // });
            await screenshotNoTime({
                test,
                page,
                filename: pathData.name,
                viewPage: true,
            });
            addCSV([pathData.title, pathData.name, page.url()]);

        });
    }
    else {
        test(`Get static photo path=${pathData.path} name=${pathData.name}`, async () => {
            await goToPageWaiting({ page, path: pathData.path, type: "admin" });

            await expect(
                page.locator("div.sc-top-bar-content").first()
            ).toBeVisible();
            if (pathData.path.includes("shop/discount/")) {
                const refreshBtn = await page.getByRole("button", { name: "refresh" });
                await refreshBtn.click();
            }
            if (pathData.name == "M16" || pathData.name == "M17" || pathData.name == "M20" || pathData.name == "M21") {
                await page.locator("a.nav-commendation").first().click()
                // await page.locator('text=Letter ID').first().dblclick();
            }
            await new Promise((r) => setTimeout(r, 3000));
            await screenshotNoTime({
                test,
                page,
                filename: pathData.name,
                viewPage: true,
            });
            // addCSV([pathData.category, pathData.title, pathData.name, page.url()]);
            addCSV([pathData.title, pathData.name, page.url()]);
            // 截重复的图片
            if (pathData.commonList) {
                for (let i = 0; i < pathData.commonList.length; i++) {
                    await screenshotNoTime({
                        test,
                        page,
                        filename: pathData.commonList[i],
                        viewPage: true,
                    });
                    addCSV([pathData.titleList[i], pathData.commonList[i], page.url()]);
                }
            }


        });
    }
});
