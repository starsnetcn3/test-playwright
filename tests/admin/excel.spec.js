// @ts-check
const { test, expect } = require('@playwright/test');
const { adminLogin } = require('../../utils/login');
import goToPage from '../../utils/goToPage';
import { testSaveBtn } from '../../utils/button';

const paths = [
    // Warehouse
    'warehouse/inventory',

    // Roles and Permission
    'staff-roles-and-permission/permission',

    // Customer Group Permission
    // 'membership/customer-group/permission/customer-url',
    // 'membership/customer-group/permission/product-category',
    // 'membership/customer-group/permission/product',
    // 'membership/customer-group/permission/blog-category',
];

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
    await page.close();
});

// No Extra Tests can be done since Excel does NOT react to changes
for (const path of paths) {
    test.describe(`${path}`, () => {
        test.describe.configure({ mode: 'serial' });

        test(`Render`, async () => {
            await goToPage({ page, path, type: 'admin' });
            await expect(
                page.locator('div.vue-excel-editor').first()
            ).toBeVisible();
        });

        switch (path) {
            case 'warehouse/inventory':
                test('Change Data', async () => {
                    test.slow();
                    const table = page.locator('id=systable');
                    const grid = table.locator('tbody > tr > td');
                    const cell = grid.nth(3);
                    const value = await cell.innerText();
                    await cell.click();
                    await page.keyboard.press('ArrowRight');
                    const newValue = parseInt(value) + 1;
                    await page.keyboard.type(`${newValue}`);
                    await page.keyboard.press('Enter');
                    await testSaveBtn({ page });
                });
                break;

            case 'staff-roles-and-permission/permission':
                test('Change Data', async () => {
                    test.slow();
                    const table = page.locator('id=systable');
                    const grid = table.locator('tbody > tr > td');
                    const cell = grid.nth(3);
                    const value = await cell.innerText();
                    await cell.click();
                    await page.keyboard.type(value === 'RW' ? 'RO' : 'RW');
                    await page.keyboard.press('Enter');
                    await testSaveBtn({ page });
                });
                break;

            default:
                // TODO: All Permission Pages
                break;
        }
    });
}
