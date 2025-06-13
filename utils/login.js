const { chromium } = require('@playwright/test')
require('dotenv').config()

let browser
let context
let page

async function adminLogin() {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()

    await page.goto('/en/@app/authentication/login')

    const email = page.locator('input').first()
    await email.fill('su@starsnet.com.hk')

    const password = page.locator('input').last()
    await password.fill('Password12345')

    await page.getByRole('button', { name: /login/i }).click()
    await page.waitForURL('/en/@app')

    return { browser, context, page }
}

async function customerLogin() {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()

    await page.goto('authentication/login/email')
    let inputs = await page.locator('input.form-control')

    await inputs.nth(0).fill('guest@gmail.com')
    await inputs.nth(1).fill('Password12345')
    await page.getByRole('button', { name: 'Login' }).first().click().then(async () => {
        await checkApi({ page, url: '/api' })
    })

    return { browser, context, page }
}

async function guest() {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()

    return { browser, context, page }
}

module.exports = { adminLogin, customerLogin, guest }
