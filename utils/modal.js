const { test, expect } = require('@playwright/test')
import screenshot from "./screenshot";


const toggleModalByRoleAndName = async ({ page, role, name, modalId }) => {
    const btn = await page.getByRole(role, { name }).first()
    await btn.click()

    await expect(page.locator(`#${modalId}`).first()).toBeVisible()
    await screenshot({ test, page, filename: `${page.url()}-modal` })

    await page.getByRole('button', { name: '×' }).first().click()
    await expect(page.locator(`#${modalId}`).first()).toBeVisible({ visible: false })


}

export { toggleModalByRoleAndName }