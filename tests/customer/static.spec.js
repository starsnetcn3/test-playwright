const { test, expect } = require('@playwright/test')
const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { randomInt, randomStr } from "../../utils/random";
import { clickCheckbox, fillAllInputs, fillAllTextAreas, fillAllInputsByType, fillAllTextAreasWithoutPlaceholder } from '../../utils/input'

const paths = [
    "",
    "about-us",
    "contact-us",
]

const tosPaths = [
    "terms-of-service/payment-terms-and-special-fees",
    "terms-of-service/privacy-policy",
    "terms-of-service/refund-policy",
    "terms-of-service/shipping-policy",
    "terms-of-service/terms-and-conditions",
]

const resultPaths = [
    "not-found",
    "result/order/success",
    "result/order/failure",
    "result/order/cancelled"
]

let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.afterAll(async ({ browser }) => {
    await page.close()
})


test.describe('TOS', () => {
    tosPaths.forEach(path => {
        test(`${path}`, async ({ page }) => {
            await goToPage({ page, path, type: 'customer' })
        })
    });
})

test.describe('Results', () => {
    resultPaths.forEach(path => {
        test(`${path}`, async ({ page }) => {
            await goToPage({ page, path, type: 'customer' })
        })
    });
})

test.describe('Contact Us', () => {
    test.describe.configure({ mode: 'serial' });

    const path = 'contact-us'
    test('Render', async () => {
        await goToPage({ page, path, type: 'customer' })
    })

    test('Submit Form', async () => {
        await fillAllInputsByType({ page })
        await page.getByLabel('Contact Phone Number *').first().fill(randomInt({ min: 90000000, max: 99999999 }).toString())
        await fillAllTextAreasWithoutPlaceholder({ page })
        const submitBtn = page.getByRole('button', { name: 'Send Your Message' })
        await submitBtn.click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })
})

test.describe('About Us', async () => { })
test.describe('Landing', async () => { })
