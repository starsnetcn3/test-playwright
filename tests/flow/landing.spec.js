require('dotenv').config();
const { test, expect } = require('@playwright/test')

import goToPage from "../../utils/goToPage";
import screenshot from "../../utils/screenshot";

let customerPage
const customerUrl = process.env.CUSTOMER_URL

test.beforeAll(async ({ browser }) => {
    customerPage = await browser.newPage()
})

test('Landing', async () => {
    await customerPage.goto(`/`);
    await screenshot({ test, page: customerPage, filename: `desktop-landing/${customerPage.url()}` })
    await customerPage.setViewportSize({ "width": 390, "height": 844 })
    await screenshot({ test, page: customerPage, filename: `mobile-landing/${customerPage.url()}` })
})




