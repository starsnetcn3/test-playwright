// @ts-check
import { test, expect } from '@playwright/test';
import { adminLogin } from '../../utils/login';
import goToPage from '../../utils/goToPage';
import checkApi from '../../utils/checkApi';
import {
    testSaveAsActiveBtn,
    testRefreshBtn,
    testSaveBtn,
} from '../../utils/button';
import { clickCheckbox } from '../../utils/input';
import screenshot from '../../utils/screenshot';

const paths = [
    // Online Shop
    'shop/online/category/main',
    'shop/online/order/main',
    'shop/online/category/mini',
    'shop/online/order/mini',

    // Offline Shop
    // 'shop/offline/store',
    // 'shop/offline/cashier',
    // 'shop/offline/order',

    // Warehouse
    'warehouse/location',
    'warehouse/product',
    'warehouse/product/review',

    // Discount
    'shop/discount/main',
    'shop/discount/redeemed-voucher',
    'shop/discount/promotion-code',

    // Roles and Permission
    'staff-roles-and-permission/accounts',
    'staff-roles-and-permission/roles',

    // Logistics
    'logistics/courier',
    // 'logistics/courier/employee',
    'logistics/address',
    // 'logistics/shipment',

    // Blog
    'blog/category',
    'blog/post',

    // Customer
    'membership/customer',
    'membership/customer-group',
    'membership/point-settings',

    // Enquiry
    'enquiry',

    // Appointment
    'appointment/employee',

    // Marketing
    'marketing/affiliator',
    'marketing/affiliate-link',
];

async function testFilterOption({ name }) {
    await test.step(name, async () => {
        const option = await page.getByRole('link', { name, exact: true });
        if (await option.isVisible()) {
            await option
                .first()
                .click()
                .then(async () => {
                    await checkApi({ page, url: '/api' });
                });
        }
    });
}

async function testActionOption({ name }) {
    await test.step(name, async () => {
        await clickCheckbox({ page, nth: 2 });
        const option = await page.getByRole('link', { name });
        if (await option.isVisible()) {
            await option
                .first()
                .click()
                .then(async () => {
                    await checkApi({ page, url: '/api' });
                });
        }
    });
}

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
    await page.close();
});

paths.forEach((path) => {
    test.describe(`${path}`, () => {
        test.describe.configure({ mode: 'serial' });

        test('Render', async () => {
            await goToPage({ page, path, type: 'admin' });
            await expect(page.getByLabel('search').first()).toBeVisible();
        });

        test('Refresh Button', async () => {
            await testRefreshBtn({ page });
        });

        test('Filter Button', async () => {
            await test.step('Select Filter Button', async () => {
                const filterBtn = await page
                    .getByRole('button', { name: 'Filter' })
                    .first();
                if (await filterBtn.isVisible()) {
                    await filterBtn.click();
                } else {
                    test.skip();
                }
            });

            switch (path) {
                case 'logistics/shipment':
                    await testFilterOption({ name: 'Ready For Delivery' });
                    await testFilterOption({ name: 'On The Way' });
                    await testFilterOption({ name: 'Delivered' });
                    await testFilterOption({ name: 'Cancelled' });
                    await testFilterOption({ name: 'Pending' });
                    break;
                case 'logistics/address':
                    await testFilterOption({ name: 'From' });
                    await testFilterOption({ name: 'To' });
                    break;
                case 'warehouse/product/review':
                    await testFilterOption({ name: 'Pending' });
                    break;
                case 'shop/discount/promotion-code':
                    break;
                default:
                    await testFilterOption({ name: 'Draft' });
                    await testFilterOption({ name: 'Archived' });
                    await testFilterOption({ name: 'Active' });
            }
        });

        test('Action Button', async () => {
            test.slow();
            await test.step('Select Action Button', async () => {
                const actionBtn = await page
                    .getByRole('button', { name: 'Action' })
                    .first();
                if (await actionBtn.isVisible()) {
                    await actionBtn.click();
                } else {
                    test.skip();
                }
            });

            switch (path) {
                case 'logistics/shipment':
                    await testActionOption({ name: 'Ready For Delivery' });
                    await testActionOption({ name: 'On The Way' });
                    await testActionOption({ name: 'Delivered' });
                    await testActionOption({ name: 'Cancelled' });
                    await testActionOption({ name: 'Pending' });
                    break;

                case 'shop/online/order/main':
                case 'shop/online/order/mini':
                case 'shop/offline/order':
                case 'warehouse/product/review':
                case 'enquiry':
                    test.skip();
                    break;
                default:
                    await testActionOption({ name: 'Draft' });
                    await testActionOption({ name: 'Archived' });
                    await testActionOption({ name: 'Active' });
            }
        });

        test('Pencil Details', async () => {
            const pencils = page.locator('i.mdi.mdi-pencil');
            if (await pencils.count()) {
                await pencils
                    .first()
                    .click()
                    .then(async () => {
                        await checkApi({ page, url: '/api' });
                    });
                await expect(
                    page.locator('div.sc-top-bar-content').first()
                ).toBeVisible();
                await expect(
                    page.locator('#sc-page-content').first()
                ).toBeVisible();
            } else {
                test.skip();
            }
        });
    });
});
