// @ts-check
const { test, expect } = require('@playwright/test');
const { adminLogin } = require('../../utils/login');
import goToPage from '../../utils/goToPage';
import {
    testCreateBtn,
    testDeleteBtn,
    testSaveAsActiveBtn,
    testSaveBtn,
    testSaveOrSaveAsActiveBtn,
    testUploadBtn,
} from '../../utils/button';
import {
    clickCheckbox,
    clickRadioBtn,
    fillAllInputs,
    fillAllTextAreas,
    fillDatePicker,
} from '../../utils/input';
import checkApi from '../../utils/checkApi';
import screenshot from '../../utils/screenshot';
import { randomInt } from '../../utils/random';

async function testSelect2({ page, nth }) {
    const selects = await page.locator('.select2-container').nth(nth);
    const selectResults = await page.locator('id=select2--results');
    await selects.click();
    await selectResults
        .nth(0)
        .locator('li.select2-results__option')
        .nth(1)
        .click();
}

const paths = [
    // Online Shop
    'shop/online/category/main',
    'shop/online/category/mini',

    // Offline Shop
    // 'shop/offline/store',
    // 'shop/offline/cashier',

    // Discount
    'shop/discount/promotion-code',

    // Warehouse
    'warehouse/location',
    'warehouse/product',

    // Roles and Permission
    'staff-roles-and-permission/accounts',
    'staff-roles-and-permission/roles',

    // Logistics
    'logistics/courier',
    // 'logistics/courier/employee',
    'logistics/address',

    // Blog
    'blog/category',
    'blog/post',

    // Membership
    'membership/customer-group',

    // Cashflow
    // 'cash-flow/expense',

    // Appointment
    'appointment/employee',

    // Marketing
    'marketing/affiliator',
    'marketing/affiliate-link',
];

const noInputs = ['membership/customer'];

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
    await page.close();
});

paths.forEach((path) => {
    test.describe.serial(`${path}`, () => {
        let currentUrl;

        test(`Render ${path}`, async () => {
            await goToPage({ page, path, type: 'admin' });
        });

        // Create
        test(`Create ${path}`, async () => {
            test.slow();
            switch (path) {
                // case 'shop/discount/main':
                //     const btn = await page.getByText('Create').first();
                //     await btn.hover();
                //     await screenshot({
                //         test,
                //         page,
                //         filename: `${page.url()}-api-request`,
                //     });
                //     const storeDiscountBtn = await page.getByRole('link', {
                //         name: 'Store',
                //         exact: true,
                //     });
                //     await storeDiscountBtn.click().then(async () => {
                //         await checkApi({ page, url: '/api' });
                //     });
                //     await expect(
                //         page.locator('input.uk-input').first()
                //     ).toBeVisible();
                //     currentUrl = page.url();
                //     await clickRadioBtn({ page, name: 'Price Discount' });
                //     await clickRadioBtn({ page, name: 'Select Group' });
                //     await clickRadioBtn({ page, name: 'All Customer' });
                //     await fillDatePicker({ page, nth: 0, date: 10 });
                //     await fillDatePicker({ page, nth: 1, date: 20 });
                //     await fillAllInputs({ page });
                //     await fillAllTextAreas({ page });
                //     await testSaveOrSaveAsActiveBtn({ page });
                //     break;

                case 'staff-roles-and-permission/accounts':
                case 'marketing/affiliator':
                    await new Promise((r) => setTimeout(r, 1000));
                    const btn = await page.getByText('Create').first();
                    await screenshot({
                        test,
                        page,
                        filename: `${page.url()}-api-request`,
                    });
                    await btn.click();
                    await fillAllInputs({ page });
                    await page.getByText('Create').nth(4).click();
                    await checkApi({ page, url: '/api' });
                    await expect(
                        page.locator('input.uk-input').first()
                    ).toBeVisible();
                    currentUrl = page.url();
                    await fillAllInputs({ page });
                    await fillAllTextAreas({ page });
                    await testSaveOrSaveAsActiveBtn({ page });
                    break;

                case 'marketing/affiliate-link':
                    await testCreateBtn({ page });
                    await expect(
                        page.locator('input.uk-input').first()
                    ).toBeVisible();
                    currentUrl = page.url();
                    await fillAllInputs({ page });
                    await fillAllTextAreas({ page });
                    await testSelect2({ page, nth: 2 });
                    await testSelect2({ page, nth: 3 });
                    await testSaveOrSaveAsActiveBtn({ page });
                    break;

                default:
                    await testCreateBtn({ page });
                    await expect(
                        page.locator('input.uk-input').first()
                    ).toBeVisible();
                    currentUrl = page.url();
                    await fillAllInputs({ page });
                    await fillAllTextAreas({ page });
                    await testSaveOrSaveAsActiveBtn({ page });
            }
        });

        test(`F5 Render ${path}`, async () => {
            await new Promise((r) => setTimeout(r, 1000));
            await page.goto(currentUrl);
            await expect(page.locator('input.uk-input').first()).toBeVisible();
        });

        // Update
        test(`Update ${path}`, async () => {
            await goToPage({ page, path, type: 'admin' });
            await page.locator('i.mdi.mdi-pencil').first().click();
            await expect(page.locator('input.uk-input').first()).toBeVisible();
            await testSaveOrSaveAsActiveBtn({ page });
        });

        // Image Upload
        test(`Upload Image ${path}`, async () => {
            await goToPage({ page, path, type: 'admin' });
            await page.locator('i.mdi.mdi-pencil').first().click();
            await expect(page.locator('input.uk-input').first()).toBeVisible();
            if (path == 'cash-flow/expense') {
                await testUploadBtn({ page, image: './dummy/bank_slip.jpeg' });
            } else {
                await testUploadBtn({ page });
            }

            await testSaveOrSaveAsActiveBtn({ page });
        });

        // Delete
        // test(`Delete ${path}`, async () => {
        //     if (path == 'staff-roles-and-permission/accounts') {
        //         test.skip()
        //     }
        //     await goToPage({ page, path, type: 'admin' })
        //     await page.locator('i.mdi.mdi-pencil').first().click()
        //     await expect(page.locator('input.uk-input').first()).toBeVisible()
        //     await testDeleteBtn({ page })
        // })
    });
});

test.describe('Group for warehouse/product', () => {
    test.describe.configure({ mode: 'serial' });

    let currentUrl;
    const path = 'warehouse/product';

    // Create
    test(`Create Product`, async () => {
        await goToPage({ page, path, type: 'admin' });
        await testCreateBtn({ page });
        await expect(page.locator('input.uk-input').first()).toBeVisible();
        currentUrl = page.url();

        // await testSaveOrSaveAsActiveBtn({ page });
    });

    test(`Update Product Textfields only`, async () => {
        await page.goto(currentUrl);
        await expect(page.locator('input.uk-input').first()).toBeVisible();
        await fillAllInputs({ page });
        await fillAllTextAreas({ page });

        await testSaveOrSaveAsActiveBtn({ page });
    });

    test(`Update Product Image only`, async () => {
        await page.goto(currentUrl);
        await expect(page.locator('input.uk-input').first()).toBeVisible();
        await testUploadBtn({ page });

        await testSaveOrSaveAsActiveBtn({ page });
    });

    test(`Update Variant only`, async () => {
        test.slow();
        await page.goto(currentUrl);
        await expect(page.locator('input.uk-input').first()).toBeVisible();

        const addItemBtn = await page.getByText('Add Item');
        await addItemBtn.click();
        await expect(page.locator('div.modal-body').first()).toBeVisible();
        await screenshot({ test, page, filename: `${page.url()}-modal` });
        await fillAllInputs({ page });
        await fillAllTextAreas({ page });
        await testUploadBtn({ page, nth: 1 });

        // await page
        //     .locator('#modal-edit-product-variant___BV_modal_body_ div')
        //     .filter({ hasText: 'Cancel Save' })
        //     .getByRole('button', { name: 'Save' })
        //     .first()
        //     .click();
        await page.locator('button.close').first().click();
        await expect(page.locator('div.modal-body').first()).toBeVisible({
            visible: false,
        });

        await testSaveOrSaveAsActiveBtn({ page });
    });

    test('Assign to Category', async () => {
        await page.goto(currentUrl);
        await expect(page.locator('input.uk-input').first()).toBeVisible();

        // await clickCheckbox({ page, nth: 3 });
        await testSaveOrSaveAsActiveBtn({ page });
    });
});

test.describe('Group for membership/customer', () => {
    test.describe.configure({ mode: 'serial' });

    let currentUrl;
    const path = 'membership/customer';

    test('Create Customer', async () => {
        await goToPage({ page, path, type: 'admin' });
        const btn = await page.getByText('Create').first();
        await screenshot({
            test,
            page,
            filename: `${page.url()}-api-request`,
        });
        await btn.click();
        await fillAllInputs({ page });
        await page.getByText('Create').nth(4).click();
        await checkApi({ page, url: '/api' });
        await expect(page.locator('id=sc-page-content').first()).toBeVisible();
        currentUrl = page.url();
    });

    test('Save Data', async () => {
        await page.goto(currentUrl);
        await expect(page.locator('id=sc-page-content').first()).toBeVisible();

        await page
            .getByRole('heading', { name: 'Customer Information' })
            .getByRole('link')
            .first()
            .click();
        await expect(
            page.getByText('Edit Customer Details').first()
        ).toBeVisible();
        await fillAllInputs({ page });
        await fillAllTextAreas({ page });
        await page
            .locator('#modal-edit-customer-details')
            .getByText('Save')
            .first()
            .click()
            .then(async () => {
                return await checkApi({ page, url: '/api' });
            });
    });

    // test('Edit with Input', async () => {
    //     await page.goto(currentUrl);
    //     await expect(page.locator('id=sc-page-content').first()).toBeVisible();

    //     await page
    //         .getByRole('heading', { name: 'Customer Information' })
    //         .getByRole('link')
    //         .first()
    //         .click();
    //     await expect(
    //         page.getByText('Edit Customer Details').first()
    //     ).toBeVisible();
    //     await fillAllTextAreas({ page });
    //     await page
    //         .locator('#modal-edit-customer-details')
    //         .getByText('Save')
    //         .first()
    //         .click()
    //         .then(async () => {
    //             return await checkApi({ page, url: '/api' });
    //         });
    // });

    test('Edit with Image Upload', async () => {
        await page.goto(currentUrl);
        await expect(page.locator('id=sc-page-content').first()).toBeVisible();

        await page
            .getByRole('heading', { name: 'Customer Information' })
            .getByRole('link')
            .first()
            .click();
        await expect(
            page.getByText('Edit Customer Details').first()
        ).toBeVisible();
        await page
            .getByPlaceholder('Phone ')
            .first()
            .fill(`${randomInt({ min: 90000000, max: 99999999 })}`);
        await testUploadBtn({ page });
        await page
            .locator('#modal-edit-customer-details')
            .getByText('Save')
            .first()
            .click()
            .then(async () => {
                return await checkApi({ page, url: '/api' });
            });
    });

    test('Test Save Buttons', async () => {
        await page.goto(currentUrl);
        await expect(page.locator('id=sc-page-content').first()).toBeVisible();
        await testSaveBtn({ page, nth: 1 });
        await testSaveBtn({ page, nth: 2 });
    });

    test('Test Delete Button', async () => {
        await page.goto(currentUrl);
        await expect(page.locator('id=sc-page-content').first()).toBeVisible();
        await testDeleteBtn({ page });
    });
});

test.describe('shop/discount/main', () => {
    const path = 'shop/discount/main';

    let discountTypes = ['Store', 'Free Shipping', 'Promotion Code', 'Voucher'];

    discountTypes.forEach((discountType) => {
        test.describe.serial(discountType, () => {
            let currentUrl;

            test('Create', async () => {
                await goToPage({ page, path, type: 'admin' });

                const btn = await page.getByText('Create').first();
                await btn.hover();
                const storeDiscountBtn = await page.getByRole('link', {
                    name: discountType,
                    exact: true,
                });
                await storeDiscountBtn.click().then(async () => {
                    await checkApi({ page, url: '/api' });
                });
                await expect(
                    page.locator('input.uk-input').first()
                ).toBeVisible();
                currentUrl = page.url();
            });

            test(`F5 Render`, async () => {
                await new Promise((r) => setTimeout(r, 1000));
                await page.goto(currentUrl);
                await expect(
                    page.locator('input.uk-input').first()
                ).toBeVisible();
            });

            test('Filter by Type', async () => {
                await goToPage({ page, path, type: 'admin' });
                const btn = await page.getByText('Type').first();
                await btn.hover();
                const typeBtn = await page.getByRole('link', {
                    name: discountType,
                    exact: true,
                });
                await typeBtn.click().then(async () => {
                    await checkApi({ page, url: '/api' });
                });
            });

            // Update
            test(`Update`, async () => {
                await page.locator('i.mdi.mdi-pencil').first().click();
                await expect(
                    page.locator('input.uk-input').first()
                ).toBeVisible();

                // switch (discountType) {
                //     case 'Store':
                //         await clickRadioBtn({ page, name: 'Price Discount' });
                //         await clickRadioBtn({ page, name: 'Select Group' });
                //         await clickRadioBtn({ page, name: 'All Customer' });
                //         await fillDatePicker({ page, nth: 0, date: 10 });
                //         await fillDatePicker({ page, nth: 1, date: 20 });
                //         await fillAllInputs({ page });
                //         await fillAllTextAreas({ page });
                //         break;
                //     case 'Free Shipping':
                //         await clickRadioBtn({ page, name: 'Store Discount' });
                //         await clickRadioBtn({ page, name: 'Select Group' });
                //         await clickRadioBtn({ page, name: 'All Customer' });
                //         await fillDatePicker({ page, nth: 0, date: 10 });
                //         await fillDatePicker({ page, nth: 1, date: 20 });
                //         await fillAllInputs({ page });
                //         await fillAllTextAreas({ page });
                //         break;
                //     case 'Promotion Code':
                //         await clickRadioBtn({ page, name: 'Promotion Code' });
                //     case 'Voucher':
                //         const btn = await page
                //             .getByText('Autogenerate')
                //             .first();
                //         await btn.click();
                //         await clickRadioBtn({ page, name: 'Price Discount' });
                //         await clickRadioBtn({ page, name: 'Select Group' });
                //         await clickRadioBtn({ page, name: 'All Customer' });
                //         await fillDatePicker({ page, nth: 0, date: 10 });
                //         await fillDatePicker({ page, nth: 1, date: 20 });
                //         await fillAllInputs({ page });
                //         await fillAllTextAreas({ page });
                //         break;
                //     default:
                //         break;
                // }

                await fillAllInputs({ page });
                await fillAllTextAreas({ page });
                await testSelect2({ page, nth: 1 });
                await testSaveOrSaveAsActiveBtn({ page });
            });

            // Delete
            test(`Delete`, async () => {
                await goToPage({ page, path, type: 'admin' });
                await page.locator('i.mdi.mdi-pencil').first().click();
                await expect(
                    page.locator('input.uk-input').first()
                ).toBeVisible();
                await testDeleteBtn({ page });
            });
        });
    });
});
