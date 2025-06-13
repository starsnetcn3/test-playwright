require('dotenv').config();
const { test, expect } = require('@playwright/test')

import goToPage from "../../utils/goToPage";
import screenshot from "../../utils/screenshot";
import { testCreateBtn, testDeleteBtn, testSaveAsActiveBtn, testSaveBtn, testSaveOrSaveAsActiveBtn, testUploadBtn } from "../../utils/button";
import { clickCheckbox, clickRadioBtn, fillAllInputs, fillAllTextAreas, fillDatePicker } from '../../utils/input'
let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.afterAll(async ({ browser }) => {
    await page.close()
})


test.describe('Expense', () => {
    test.describe.serial('Overview and Details', () => {
        let path = 'cash-flow/expense'
        let currentUrl;

        test(`Render`, async () => {
            await goToPage({ page, path, type: 'admin' })
        })

        test('Create', async () => {
            await testCreateBtn({ page })
            await expect(page.locator('input.uk-input').first()).toBeVisible()
            currentUrl = page.url()
            await fillAllInputs({ page })
            await fillAllTextAreas({ page })
            await testSaveOrSaveAsActiveBtn({ page })
            await new Promise(r => setTimeout(r, 2000));

        })

        test(`Upload Image`, async () => {

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            await goToPage({ page, path, type: 'admin' })
            await page.locator('i.mdi.mdi-pencil').first().click()
            await expect(page.locator('input.uk-input').first()).toBeVisible()
            await testUploadBtn({ page, image: `./dummy/bankslip/bankslip-${getRandomInt(15)}.png` })
            await testSaveOrSaveAsActiveBtn({ page })
            await new Promise(r => setTimeout(r, 2000));

        })

        test(`Update`, async () => {
            await goToPage({ page, path, type: 'admin' })
            await page.locator('i.mdi.mdi-pencil').first().click()
            await expect(page.locator('input.uk-input').first()).toBeVisible()
            await testSaveOrSaveAsActiveBtn({ page })
        })
    })

    test.describe.serial('Report', () => {
        let path = 'cash-flow/expense/report'
        let currentUrl;

        test(`Render`, async () => {
            await goToPage({ page, path, type: 'admin' })
        })
    })

})

test.describe.serial('Receipt', () => {
    test.describe('Receipt Generator', () => {
        let path = 'cash-flow/receipt/create'
        let currentUrl;

        for (let i = 0; i < 5; i++) {
            test(`Render ${i}`, async () => {

                await goToPage({ page, path: 'cash-flow/receipt', type: 'admin' })
                await testCreateBtn({ page })
                await page.locator('i.mdi.mdi-pencil').first().click()

                await testSaveOrSaveAsActiveBtn({ page })
            })
        }
    })

    test.describe.serial('Receipt Overview and Detail', () => {
        let path = 'cash-flow/receipt'

        test(`Render`, async () => {
            await goToPage({ page, path, type: 'admin' })
            await new Promise(r => setTimeout(r, 3000));
        })

        test(`Update`, async () => {
            await goToPage({ page, path, type: 'admin' })
            await page.locator('i.mdi.mdi-pencil').first().click()
            await expect(page.getByRole('heading', { name: 'RECEIPT', exact: true })).toBeVisible()
            await testSaveOrSaveAsActiveBtn({ page })
        })
    })
})




