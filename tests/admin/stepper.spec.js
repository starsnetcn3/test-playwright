// @ts-check
const { test, expect } = require('@playwright/test');
const { adminLogin } = require('../../utils/login');

import goToPage from '../../utils/goToPage';
import checkApi from '../../utils/checkApi';
import { testNextBtn } from '../../utils/button';
import { clickCheckbox, fillAllInputs } from '../../utils/input';
import screenshot from '../../utils/screenshot';

async function testSelect2({ page, nth }) {
    const selects = await page.locator('#select2--container').nth(nth);
    const selectResults = await page.locator('id=select2--results');
    await selects.click();
    await selectResults
        .nth(0)
        .locator('li.select2-results__option')
        .nth(0)
        .click();
}

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
    await page.close();
});

test.describe('Fake Procurement', () => {
    test.describe.configure({ mode: 'serial' });

    let steps = 0;
    test.beforeEach(async () => {
        await new Promise((r) => setTimeout(r, 2000));
        await screenshot({
            test,
            page,
            filename: `${page.url()}-${steps + 1}`,
        });
        steps++;
    });

    test('Step 1: Render', async () => {
        const path = 'logistics/fprocurement';
        await goToPage({ page, path, type: 'admin' });
        await expect(
            page.locator('div.sc-top-bar-content').first()
        ).toBeVisible();
    });

    test('Step 2: Add Products', async () => {
        const btn = await page.getByRole('button', { name: 'Add' });
        await btn.dblclick();
    });

    test('Step 3: Choose Supplier', async () => {
        await testSelect2({ page, nth: 0 });
    });

    test('Step 4: Choose Courier', async () => {
        await testSelect2({ page, nth: 1 });
    });
});

test.describe('Real Procurement', () => {
    test.describe.configure({ mode: 'serial' });

    let steps = 0;
    test.beforeEach(async () => {
        await new Promise((r) => setTimeout(r, 2000));
        await screenshot({
            test,
            page,
            filename: `${page.url()}-${steps + 1}`,
        });
        steps++;
    });

    test('Step 1: Cargo Details', async () => {
        await test.step('Render Table', async () => {
            const path = 'logistics-management/procurement';
            await goToPage({ page, path, type: 'admin' });
            await expect(page.locator('div.wizard').first()).toBeVisible();
        });

        await test.step('Click Next to step 2', async () => {
            await clickCheckbox({ page, nth: 0 });
            await testNextBtn({ page, nth: 1 });
            await expect(
                page.getByRole('tab', { name: 'Order Details' }).first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 2: Order Details', async () => {
        test.slow();
        await test.step('Fill all info', async () => {
            await page
                .getByPlaceholder('Address ')
                .first()
                .fill('九龍新蒲崗富源街13號地下');
            await page.getByPlaceholder('Company Name ').first().fill('順豐');
            await page.getByPlaceholder('Contact Name ').first().fill('曾不凡');
            await page.getByPlaceholder('Phone ').first().fill('57612319');

            await page
                .getByPlaceholder('Address ')
                .nth(1)
                .fill('尖沙嘴漆咸道87-105號百利商業中心12樓31號舖');
            await page.getByPlaceholder('Company Name ').nth(1).fill('豐順');
            await page.getByPlaceholder('Contact Name ').nth(1).fill('尖沙嘴');
            await page.getByPlaceholder('Phone ').nth(1).fill('27978286');

            await page.getByRole('textbox', { name: 'Amount' }).fill('100');
        });

        await test.step('Click Next to step 3', async () => {
            await testNextBtn({ page, nth: 1 });
            await expect(
                page
                    .getByRole('tab', {
                        name: 'Confirmation of Shipment Details',
                    })
                    .first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 3: Confirmation', async () => {
        await test.step('Click Next to Step 4', async () => {
            await testNextBtn({ page, nth: 1 });
            await expect(
                page.getByRole('tab', { name: 'Place Order' }).first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 4: Successful', async () => {
        await expect(
            page.locator('i.mdi-check-circle-outline').first()
        ).toBeVisible();
    });
});

test.describe('Real Delivery', () => {
    test.describe.configure({ mode: 'serial' });

    let steps = 0;
    test.beforeEach(async () => {
        await new Promise((r) => setTimeout(r, 2000));
        await screenshot({
            test,
            page,
            filename: `${page.url()}-${steps + 1}`,
        });
        steps++;
    });

    test('Step 1: Cargo Details', async () => {
        test.slow();
        await test.step('Render Table', async () => {
            const path = 'logistics-management/delivery';
            await goToPage({ page, path, type: 'admin' });
            await expect(page.locator('div.wizard').first()).toBeVisible();
        });

        await test.step('Select Order', async () => {
            await testSelect2({ page, nth: 0 });
        });

        await test.step('Click Next to step 2', async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
                page.getByRole('tab', { name: 'Order Details' }).first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 2: Order Details', async () => {
        test.slow();
        await test.step('Fill all info', async () => {
            await testSelect2({ page, nth: 1 });

            await page
                .getByPlaceholder('Address ')
                .first()
                .fill('九龍新蒲崗富源街13號地下');
            await page.getByPlaceholder('Company Name ').first().fill('順豐');
            await page.getByPlaceholder('Contact Name ').first().fill('曾不凡');
            await page.getByPlaceholder('Phone ').first().fill('57612319');

            await page
                .getByPlaceholder('Address ')
                .nth(1)
                .fill('尖沙嘴漆咸道87-105號百利商業中心12樓31號舖');
            await page.getByPlaceholder('Company Name ').nth(1).fill('豐順');
            await page.getByPlaceholder('Contact Name ').nth(1).fill('尖沙嘴');
            await page.getByPlaceholder('Phone ').nth(1).fill('27978286');

            await page.getByPlaceholder('Total Weight ').first().fill('10');
            await page.getByPlaceholder('Box Length ').first().fill('90');
            await page.getByPlaceholder('Box Width ').first().fill('70');
            await page.getByPlaceholder('Box Height ').first().fill('60');

            await page.getByRole('textbox', { name: 'Amount' }).fill('100');
        });

        await test.step('Click Next to step 3', async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
                page
                    .getByRole('tab', {
                        name: 'Confirmation of Shipment Details',
                    })
                    .first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 3: Confirmation', async () => {
        await test.step('Click Next to Step 4', async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
                page.getByRole('tab', { name: 'Place Order' }).first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 4: Successful', async () => {
        await expect(
            page.locator('i.mdi-check-circle-outline').first()
        ).toBeVisible();
    });
});

test.describe('Real Shipment', () => {
    test.describe.configure({ mode: 'serial' });

    let steps = 0;
    test.beforeEach(async () => {
        await new Promise((r) => setTimeout(r, 2000));
        await screenshot({
            test,
            page,
            filename: `${page.url()}-${steps + 1}`,
        });
        steps++;
    });

    test('Step 1: Cargo Details', async () => {
        test.slow();
        await test.step('Render Table', async () => {
            const path = 'logistics/shipment/create';
            await goToPage({ page, path, type: 'admin' });
            await expect(page.locator('div.wizard').first()).toBeVisible();
        });

        await test.step('Select Order', async () => {
            await testSelect2({ page, nth: 0 });
        });

        await test.step('Fill all info', async () => {
            await fillAllInputs({ page });
        });

        await test.step('Click Next to step 2', async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
                page.locator('id=step-ChoiceofCourier2').first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 2: Choice of Courier', async () => {
        await test.step('Select Order', async () => {
            await testSelect2({ page, nth: 5 });
        });

        await test.step('Click Next to step 3', async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
                page.locator('id=step-ConfirmationofShipmentDetails4').first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 3: Confirmation', async () => {
        await test.step('Click Next to Step 4', async () => {
            await testNextBtn({ page, nth: 0 });
            await expect(
                page.locator('id=step-PlaceOrder6').first()
            ).toHaveAttribute('aria-selected', 'true');
        });
    });

    test('Step 4: Successful', async () => {
        await expect(
            page.locator('i.mdi-check-circle-outline').first()
        ).toBeVisible();
    });
});

test.describe('Cashier', () => {
    test.describe.configure({ mode: 'serial' });

    let steps = 0;
    test.beforeEach(async () => {
        await new Promise((r) => setTimeout(r, 2000));
        await screenshot({
            test,
            page,
            filename: `${page.url()}-${steps + 1}`,
        });
        steps++;
    });

    test('Step 1: Choose Offline Store', async () => {
        await test.step('Render', async () => {
            const path = 'shop/offline/cashier/staff';
            await goToPage({ page, path, type: 'admin' });
            await expect(
                page.locator('div.sc-top-bar-content').first()
            ).toBeVisible();
        });

        await test.step('Choose First Offline Store', async () => {
            let cards = await page.locator('.uk-width-auto > .sc-button');
            let cardsCount = await cards.count();
            await cards.nth(cardsCount - 1).click();
            await expect(
                page.getByText('Select Cashier').first()
            ).toBeVisible();
        });
    });

    test('Step 2: Choose Cashier', async () => {
        await test.step('Choose First Offline Store', async () => {
            let cards = await page.locator('.uk-width-auto > .sc-button');
            let cardsCount = await cards.count();
            await cards.nth(cardsCount - 1).click();
            await expect(page.getByText('Select Staff').first()).toBeVisible();
        });
    });

    test('Step 3: Choose Staff', async () => {
        await test.step('Choose su@starsnet.com.hk', async () => {
            let cards = await page.locator('.uk-width-auto > .sc-button');
            let cardsCount = await cards.count();
            await cards.nth(cardsCount - 1).click();
            await expect(
                page.getByRole('heading', { name: 'Products' }).first()
            ).toBeVisible();
        });
    });

    test('Step 4: Make Order', async () => {
        await test.step('Choose Products', async () => {
            let cards = await page.locator('div.sc-padding-medium');
            for (let i = 0; i < 5; i++) {
                await cards.nth(i).click();
            }
        });

        await test.step('Click Checkout', async () => {
            await page
                .getByRole('button', { name: 'Checkout' })
                .first()
                .click()
                .then(async () => {
                    await checkApi({ page, url: '/api' });
                });
            await expect(
                page.getByRole('heading', { name: 'Checkout' }).first()
            ).toBeVisible();
        });
    });

    test('Step 5: Cart Qty Increase', async () => {
        let plusIcons = await page.locator('i.mdi-plus');
        await plusIcons
            .first()
            .click()
            .then(async () => {
                await checkApi({ page, url: '/api' });
            });
    });

    test('Step 6: Cart Qty Decrease', async () => {
        let plusIcons = await page.locator('i.mdi-minus');
        await plusIcons
            .first()
            .click()
            .then(async () => {
                await checkApi({ page, url: '/api' });
            });
    });

    test('Step 7: Checkout', async () => {
        await test.step('Click Checkout button', async () => {
            await page
                .getByRole('button', { name: 'Checkout' })
                .first()
                .click();
        });

        await test.step('Place Order', async () => {
            await page
                .getByRole('button', { name: 'Place Order' })
                .first()
                .click()
                .then(async () => {
                    await checkApi({ page, url: '/api' });
                });
            await expect(page.getByText('Successful').first()).toBeVisible();
        });
    });

    test('Step 8: Download Receipt', async () => {
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Download Receipt' }).click();
        const download = await downloadPromise;
        const downloadPath = await download.path();
    });

    test('Step 9: View Order Details', async () => {
        await page.getByRole('button', { name: 'View Order' }).click();
        await expect(
            page.getByRole('button', { name: 'Ship Order' }).first()
        ).toBeVisible();
    });
});
