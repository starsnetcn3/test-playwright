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

test.describe.serial('My Details', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/details'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Fill Form and Save', async () => {
        await fillAllInputs({ page })
        await testBtnByName({ page, name: 'Save' })
    })

    test('Upload Avatar Image', async () => {
        await testUploadBtn({ page })
    })
})

test.describe.serial('Membership', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/membership'
        await goToPage({ page, path, type: 'customer' })
    })
})

test.describe.serial('Change Password', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/password'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Change Password', async () => {
        const inputs = await page.locator('input[type=password]');
        const inputsCount = await inputs.count()
        for (let i = 0; i < inputsCount; i++) {
            let input = await inputs.nth(i)
            await input.fill('Jjdiujj12345')
        }
        const saveBtn = await page.getByRole('button', { name: 'Save' }).first()
        await saveBtn.click().then(async () => {
            await expect(page.getByText('Error from Server').first()).toBeVisible()
        })

    })
})

test.describe.serial('Change Email', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/email'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Send Mail', async () => {
        await testBtnByName({ page, name: 'Send Email' })
        await expect(page.locator('i.fa-check-circle').first()).toBeVisible()
    })
})

test.describe.serial('Address Book', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/address'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Fill All info', async () => {
        await fillAllInputs({ page })
        await fillAllTextAreas({ page })
        const optionsSelectors = await page.locator('#body-content').getByRole('combobox')
        await optionsSelectors.first().selectOption('852')
        await testBtnByName({ page, name: 'Save' })
    })
})


test.describe.serial('Contact Preferences', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/contact'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Save Changes', async () => {
        await testBtnByName({ page, name: 'Save' })
    })
})

test.describe.serial('Main Store Orders', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/main-store-order'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Offline Payment Method', async () => {
        await toggleModalByRoleAndName({ page, role: 'link', name: 'Offline Payment Method', modalId: 'payment-modal-order___BV_modal_content_' })
    })

    test('Click first Order', async () => {
        const orderLinks = await page.getByRole('link', { name: '#' })
        if (await orderLinks.first().isVisible()) {
            await orderLinks.first().click()
            await expect(page.getByRole('heading', { name: 'Order Details' }).first()).toBeVisible()
        }
    })
})

test.describe.serial('Mini Store Orders', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/mini-store-order'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Click first Order', async () => {
        const orderLinks = await page.getByRole('link', { name: '#' })
        if (await orderLinks.first().isVisible()) {
            await orderLinks.first().click()
            await expect(page.getByRole('heading', { name: 'Order Details' }).first()).toBeVisible()
        }
    })
})

test.describe.serial('Offline Store Orders', () => {
    test.skip(({ }, workerInfo) =>
        workerInfo.project.name.includes('Guest'))

    test('Render', async () => {
        const path = 'account/offline-store-order'
        await goToPage({ page, path, type: 'customer' })
    })

    test('Click first Order', async () => {
        const orderLinks = await page.getByRole('link', { name: '#' })
        if (await orderLinks.first().isVisible()) {
            await orderLinks.first().click()
            await expect(page.getByRole('heading', { name: 'Order Details' }).first()).toBeVisible()
        }
    })
})

test.describe.serial('Voucher', () => {
    // TODO
})

