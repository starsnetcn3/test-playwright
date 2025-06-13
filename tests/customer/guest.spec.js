const { test, expect } = require('@playwright/test')
const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import { randomStr, randomInt } from "../../utils/random";
import screenshot from "../../utils/screenshot";
import goToPage from "../../utils/goToPage";


const phonePaths = [
    "authentication/forget-password/phone",
    "authentication/register/phone",
    "authentication/login/phone",
]

const emailPaths = [
    "authentication/forget-password/email",
    "authentication/register/email",
    "authentication/login/email",
]

test.describe.serial('Email Authentication', () => {
    // if (workerInfo.project.name.includes('Auth')) {
    //     test.skip()
    // }

    const randomEmail = `${randomStr(5)}@gmail.com`

    test('Email Register', async ({ page }, workerInfo) => {
        if (workerInfo.project.name.includes('Auth')) {
            test.skip()
        }
        let inputs = page.locator('input.form-control')

        await goToPage({ page, path: "authentication/register/email", type: 'customer' })
        await inputs.nth(0).fill(randomEmail)
        await inputs.nth(1).fill('Customer')
        await inputs.nth(2).fill('Password12345')
        await inputs.nth(3).fill('Password12345')
        await page.getByRole('button', { name: 'Create An Account' }).first().click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })

    test('Email Login', async ({ page }, workerInfo) => {
        if (workerInfo.project.name.includes('Auth')) {
            test.skip()
        }
        let inputs = page.locator('input.form-control')
        await goToPage({ page, path: "authentication/login/email", type: 'customer' })
        await inputs.nth(0).fill(randomEmail)
        await inputs.nth(1).fill('Password12345')
        await page.getByRole('button', { name: 'Login' }).first().click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })

    test('Email Forget Password', async ({ page }, workerInfo) => {
        if (workerInfo.project.name.includes('Auth')) {
            test.skip()
        }
        let inputs = page.locator('input.form-control')
        await goToPage({ page, path: "authentication/forget-password/email", type: 'customer' })
        await inputs.nth(0).fill(randomEmail)
        await page.getByRole('button', { name: 'Send Reset Link' }).first().click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
        await expect(page.getByRole('heading', { name: 'Verification Email Sent' }).first()).toBeVisible()

    })
})

test.describe.serial('Phone Authentication', () => {
    const randomPhone = `${randomInt({ min: 90000000, max: 99999999 })}`

    test('Phone Register', async ({ page }, workerInfo) => {
        if (workerInfo.project.name.includes('Auth')) {
            test.skip()
        }
        let inputs = page.locator('input.form-control')
        await goToPage({ page, path: "authentication/register/phone", type: 'customer' })
        await inputs.nth(0).fill(randomPhone)
        await inputs.nth(1).fill('Customer')
        await inputs.nth(2).fill('Password12345')
        await inputs.nth(3).fill('Password12345')
        await page.getByRole('button', { name: 'Create An Account' }).first().click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })

    test('Phone Login', async ({ page }, workerInfo) => {
        if (workerInfo.project.name.includes('Auth')) {
            test.skip()
        }
        let inputs = page.locator('input.form-control')
        await goToPage({ page, path: "authentication/login/phone", type: 'customer' })
        await inputs.nth(0).fill(randomPhone)
        await inputs.nth(1).fill('Password12345')
        await page.getByRole('button', { name: 'Login' }).first().click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })

    test('Phone Forget Password', async ({ page }, workerInfo) => {
        if (workerInfo.project.name.includes('Auth')) {
            test.skip()
        }
        let inputs = page.locator('input.form-control')
        await goToPage({ page, path: "authentication/forget-password/phone", type: 'customer' })
        await inputs.nth(0).fill(randomPhone)
        await page.getByRole('button', { name: 'Send Reset Link' }).first().click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
        await expect(page.getByRole('heading', { name: 'Verification SMS Sent' }).first()).toBeVisible()

    })
})



