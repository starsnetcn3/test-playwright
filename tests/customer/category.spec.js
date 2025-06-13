const { test, expect, chromium } = require('@playwright/test')

const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { testBtnByName } from "../../utils/button";

let paths = [
    'blogs/categories',
    'shop/main/category',
    'shop/mini/category'
]

let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.afterAll(async ({ browser }) => {
    await page.close()
})

paths.forEach(path => {
    test.describe(`Categories of ${path}`, () => {
        test.describe.configure({ mode: 'serial' });

        test.skip(({ }, workerInfo) => ['shop/mini/category'].includes(path) &&
            workerInfo.project.name.includes('Guest'))

        test('Render', async () => {
            await goToPage({ page, path, type: 'customer' })
        })

        test('Load More', async () => {
            await testBtnByName({ page, name: 'Load More' })
        })

        test('Select First Category', async () => {
            const firstCategory = await page.locator('.front > a').first()
            if (!await firstCategory.isVisible()) {
                test.skip()
            }
            await firstCategory.click().then(async () => {
                await checkApi({ page, url: '/api' })
            })
            const navbar = page.getByRole('banner').first()
            await expect(navbar).toBeVisible()
        })
    })
});




