const { test, expect, chromium } = require('@playwright/test')

const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { clickCheckbox, fillAllTextAreas } from '../../utils/input'
import { testBtnByName } from "../../utils/button";
import { fillAllInputs } from "../../utils/input";
import { toggleModalByRoleAndName } from "../../utils/modal";
let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.afterAll(async ({ browser }) => {
    await page.close()
})


test.describe('Cart', () => {
    test.describe.configure({ mode: 'serial' });

    const path = 'shop/main/cart'
    test('Render', async () => {
        await goToPage({ page, path, type: 'customer' })
    })

    test('Load More', async () => {
        await testBtnByName({ page, name: 'Load More' })
    })

    test('Clear Cart', async () => {
        await testBtnByName({ page, name: 'Clear Cart' })
    })
})

// Prerequisite: Cart must have products
test.describe('Delivery Methods', () => {
    test.describe.configure({ mode: 'serial' });

    const path = 'shop/main/cart'
    let isCartEmpty = true
    let optionsSelectors
    let optionsSelectorsCount

    test.beforeAll(async () => {
        /**
        * By Default:
        * Last Product Qty = optionsSelectorsCount - 5
        * Destination = optionsSelectorsCount - 4
        * Delivery Method = optionsSelectorsCount - 3
        * Select Store = optionsSelectorsCount - 2 (removed if delivery method == face to face)
        * Area Code = optionsSelectorsCount - 1 (-2 if delivery method == face to face)
        * 
        * Hiding a field will lead to change of Index
        */
        await goToPage({ page, path, type: 'customer' })
        const clearCartBtn = await page.getByRole('button', { name: 'Clear Cart' }).first()
        if (await clearCartBtn.isVisible()) {
            isCartEmpty = false
            optionsSelectors = await page.locator('#body-content').getByRole('combobox')
            optionsSelectorsCount = await optionsSelectors.count()
        }
    })


    test('Change Qty', async () => {
        test.skip(isCartEmpty)
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 5)
        await qtyOptions.selectOption('1').then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })
    test('Destination', async () => {
        test.skip(isCartEmpty)
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 4)
        await qtyOptions.selectOption('US').then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })
    test('Delivery Method: Delivery', async () => {
        test.skip(isCartEmpty)
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 2)
        const optionCount = await qtyOptions.locator('option').count()
        await qtyOptions.selectOption({ index: optionCount - 1 }).then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })

    test('Delivery Method: Self-Pickup', async () => {
        test.skip(isCartEmpty)
        await test.step('Change Delivery Method', async () => {

            const deliveryMethodOptions = optionsSelectors.nth(optionsSelectorsCount - 3)
            await deliveryMethodOptions.selectOption('SELF_PICKUP').then(async () => {
                await checkApi({ page, url: '/api' })
            })
        })

        await test.step('Change Store', async () => {
            const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 2)
            const optionCount = await qtyOptions.locator('option').count()
            await qtyOptions.selectOption({ index: optionCount - 1 })
        })

    })

    test('Delivery Method: Face-to-Face Pickup', async () => {
        test.skip(isCartEmpty)
        await test.step('Change Delivery Method', async () => {
            const deliveryMethodOptions = optionsSelectors.nth(optionsSelectorsCount - 3)
            await deliveryMethodOptions.selectOption('FACE_TO_FACE_PICKUP').then(async () => {
                await checkApi({ page, url: '/api' })
            })
        })
    })

    test('Show Payment Details', async () => {
        test.skip(isCartEmpty)
        await toggleModalByRoleAndName({ page, role: 'link', name: 'Show Details', modalId: 'payment-modal___BV_modal_content_' })
    })

    test('Fill Voucher Code', async () => {
        test.skip(isCartEmpty)
        const voucherCodeForm = await page.locator('#voucher-code').first()
        await voucherCodeForm.fill('WELCOMEVOUCHER')
        await testBtnByName({ page, name: 'Apply' })
    })

    test('Fill Delivery Details', async () => {
        test.skip(isCartEmpty)
        // Fill Name and Email
        await fillAllInputs({ page })

        // Fill Phone
        const phoneInput = await page.getByPlaceholder('Phone').first()
        await phoneInput.fill('94252708')

        // Fill Area Code
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 2)
        await qtyOptions.selectOption('852')

    })


})