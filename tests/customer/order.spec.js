const { test, expect } = require('@playwright/test')
const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { randomStr } from "../../utils/random";
import { clickCheckbox, fillAllInputs, fillAllTextAreas, fillAllInputsByType, fillAllTextAreasWithoutPlaceholder } from '../../utils/input'
import { testBtnByName, testUploadBtn } from "../../utils/button";
import { toggleModalByRoleAndName } from "../../utils/modal";

let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.afterAll(async ({ browser }) => {
    await page.close()
})

const trackOrderPaths = ['shop/main/order/track/email', 'shop/main/order/track/phone']
const uploadPaymentProofPaths = ['shop/main/order/upload-payment-proof/email', 'shop/main/order/upload-payment-proof/phone']

trackOrderPaths.forEach(path => {
    test.describe.serial(`${path}`, () => {

        test('Render', async () => {
            await goToPage({ page, path, type: 'customer' })
        })

        test('Fill and Submit', async () => {
            await fillAllInputsByType({ page })

            const saveBtn = await page.getByRole('button', { name: 'Track Order' }).first()
            await saveBtn.click().then(async () => {
                await expect(page.getByText('Error from Server').first()).toBeVisible()
            })
        })

    })
});

uploadPaymentProofPaths.forEach(path => {
    test.describe.serial(`${path}`, () => {
        test('Render', async () => {
            await goToPage({ page, path, type: 'customer' })
        })

        test('Payment Methods', async () => {
            await toggleModalByRoleAndName({ page, role: 'button', name: 'View Payment Methods', modalId: 'payment-modal___BV_modal_content_' })
        })

        test('Upload Payment Proof', async () => {
            await testUploadBtn({ page, image: './dummy/bank_slip.jpeg' })
        })

        test('Fill and Submit', async () => {
            await fillAllInputsByType({ page })
            const saveBtn = await page.getByRole('button', { name: 'Submit' }).first()
            await saveBtn.click().then(async () => {
                await expect(page.getByText('Error from Server').first()).toBeVisible()
            })

        })
    })
});


