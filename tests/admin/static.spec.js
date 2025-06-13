const { test, expect } = require('@playwright/test');
const { adminLogin } = require('../../utils/login');
import goToPage from '../../utils/goToPage';
import checkApi from '../../utils/checkApi';
import { testNextBtn, testRefreshBtn, testSaveBtn } from '../../utils/button';
import { clickCheckbox } from '../../utils/input';
import screenshot from '../../utils/screenshot';

const paths = [
    // Dashboard
    'dashboard',

    // Online Shop
    'shop/online/category/main/assign',
    'shop/online/category/mini/assign',

    // Offline Shop
    // 'shop/offline/cashier/fplace-order',

    // TOS
    'tos',

    // Contact Us
    'contact-us',

    // Configuration
    'configuration/navbar',
    'configuration/footer',
    // 'configuration/landing',
    'configuration/about',

    // Result
    'results/unauthorized',

    // Marketing
    'marketing/statistics',
];

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
    await page.close();
});

for (const path of paths) {
    test(`Render ${path}`, async () => {
        await goToPage({ page, path, type: 'admin' });

        // Buttons
        let saveBtns = await page.getByText('Save');

        switch (path) {
            case 'dashboard':
            case 'marketing/statistics':
                await expect(
                    page.locator('div.sc-top-bar-content').first()
                ).toBeVisible();
                break;

            case 'shop/online/category/main/assign':
            case 'shop/online/category/mini/assign':
            case 'configuration/navbar':
            case 'configuration/footer':
                // Test Save Btn
                await expect(
                    page.locator('div.sc-task-board-wrapper').first()
                ).toBeVisible();
                await testSaveBtn({ page });
                break;

            case 'shop/offline/cashier/fplace-order':
                // Page then open Modal
                test.slow();
                await page.getByText('Checkout').first().click();
                break;

            case 'tos':
                // For each item, click the Tab, Save, then repeat for next Tab
                test.slow();
                const navItems = await page.locator('li.nav-item');
                const navItemsCount = await navItems.count();

                for (let i = 0; i < navItemsCount; i++) {
                    await navItems
                        .nth(i)
                        .click()
                        .then(async () => {
                            let innerText = await navItems.nth(i).innerText();
                            if (i > 0) {
                                await checkApi({ page, url: '/api' });
                            }
                        });
                    await saveBtns
                        .nth(i)
                        .click()
                        .then(async () => {
                            await checkApi({ page, url: '/api' });
                        });
                }
                break;

            case 'contact-us':
                // Open Modal for Contacts, then Click Modal Save Btn, then click All Save, click Refresh
                test.slow();
                await expect(page.locator('div.uk-card').first()).toBeVisible();
                await page.locator('i.mdi-pencil').first().click();
                await screenshot({
                    test,
                    page,
                    filename: `${page.url()}-modal`,
                });
                let modalSaveBtn = await page
                    .locator('#modal-edit')
                    .getByText('Save')
                    .first();
                await modalSaveBtn.click().then(async () => {
                    await checkApi({ page, url: '/api' });
                });

                await testRefreshBtn({ page });
                for (let i = 0; i <= 2; i++) {
                    await saveBtns
                        .nth(i)
                        .click()
                        .then(async () => {
                            await checkApi({ page, url: '/api' });
                        });
                    await new Promise((r) => setTimeout(r, 100));
                }
                break;

            case 'configuration/landing':
            case 'configuration/about-us':
                await expect(
                    page.locator('iframe[id="iframeid"]').first()
                ).toBeVisible();
                break;

            case 'results/unauthorized':
                await expect(
                    page.locator('span.sc-padding-medium').first()
                ).toBeVisible();
                break;

            case 'configuration/about':
                // Test Save Btn
                await expect(
                    page.locator('div.sc-top-bar-content').first()
                ).toBeVisible();
                await testSaveBtn({ page });
                break;
        }
    });
}
