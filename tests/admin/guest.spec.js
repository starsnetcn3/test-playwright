const { test, expect } = require('@playwright/test')
const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import { randomStr } from "../../utils/random";

const authenticationPaths = [
    'authentication/register',
    'authentication/forgot-password',
    'authentication/verify',
    'authentication/login',
]

const resultPaths = [
    'results/failure',
    'results/success',
]

let browser
let context
let page

test.beforeAll(async () => {
    const { browser: b, context: c, page: p } = await guest()
    browser = b
    context = c
    page = p
})

test.afterAll(async ({ browser }) => {
    await page.close()
})

test.describe('Authentication', () => {
    authenticationPaths.forEach(path => {
        test(`${path}`, async ({ page }, workerInfo) => {
            if (workerInfo.project.name.includes('Auth')) {
                test.skip()
            }

            await page.goto(`/en/@app/${path}`)

            let inputs = await page.locator('input.uk-input')

            switch (path) {
                case 'authentication/forgot-password':
                    await inputs.nth(0).fill('admin@company.com.hk')
                    break
                case 'authentication/login':
                    await inputs.nth(0).fill('su@starsnet.com.hk')
                    await inputs.nth(1).fill('Password12345')
                    await page.locator('button.sc-button').first().click().then(async () => {
                        await checkApi({ page, url: '/api' })
                    })
                    break
                case 'authentication/register':
                    // Register Disabled
                    await inputs.nth(0).fill(`staff-${randomStr(5)}@starsnet.com.hk`)
                    await inputs.nth(1).fill('Testing Staff')
                    await inputs.nth(2).fill('Password12345')
                    await inputs.nth(3).fill('Password12345')
                    break
                case 'authentication/verify':
                    await expect(page.locator('div.uk-card-body').first()).toBeVisible()
                    break
                case 'results/failure':
                case 'results/success':
                    await expect(page.locator('span.sc-padding-medium').first()).toBeVisible()
                    break
            }
        })
    });
})

test.describe('Result', () => {
    resultPaths.forEach(path => {
        test(`${path}`, async ({ page }, workerInfo) => {
            if (workerInfo.project.name.includes('Auth')) {
                test.skip()
            }
            await page.goto(`/en/@app/${path}`)
            await expect(page.locator('span.sc-padding-medium').first()).toBeVisible()
        })
    });
})


