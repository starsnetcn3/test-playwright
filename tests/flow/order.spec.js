require('dotenv').config();
const { test, expect, chromium } = require('@playwright/test')
const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { clickCheckbox, fillAllTextAreas } from '../../utils/input'
import { testBtnByName, testUploadBtn } from "../../utils/button";
import { fillAllInputs } from "../../utils/input";
import { randomStr } from "../../utils/random";
import screenshot from "../../utils/screenshot";


let adminPage
let customerPage

const adminUrl = `${process.env.ADMIN_URL}/en/@app`
const customerUrl = process.env.CUSTOMER_URL

const cardNumber = '1234123412341234'
const expiryDate = '1234'
const cvv = '123'


test.beforeAll(async ({ browser }) => {
    customerPage = await browser.newPage()
    adminPage = await browser.newPage()
})



class Customer {
    async register() {
        await customerPage.goto(`${customerUrl}/authentication/register/email`)
        let inputs = await customerPage.locator('input.form-control')
        await inputs.nth(0).fill(`${randomStr(5)}@gmail.com.hk`)
        await inputs.nth(1).fill('Customer')
        await inputs.nth(2).fill('Password12345')
        await inputs.nth(3).fill('Password12345')
        await customerPage.getByRole('button', { name: 'Create An Account' }).first().click().then(async () => {
            await checkApi({ page: customerPage, url: '/api' })
        })

        // Wait for the rest of the APIs to finish
        await new Promise(r => setTimeout(r, 2000));
    }

    async allProducts() {
        await customerPage.goto(`${customerUrl}/shop/main/product`)
        const sortOptions = await customerPage.locator('#body-content select').first();
        await sortOptions.selectOption('from-old-to-new').then(async () => {
            await checkApi({ page: customerPage, url: '/api' });
        });
    }

    async addToCart() {
        await expect(customerPage.getByRole('button', { name: 'Add' }).first()).toBeVisible()

        // Cart with Name
        await testBtnByName({ page: customerPage, name: 'Add' })

        // Cart with Btn (Beauty Queen)
        // await customerPage.locator('.bag').first().click().then(() => {
        //     checkApi({ page: customerPage, url: '/api' })
        // })

        await expect(customerPage.getByRole('heading', { name: 'Added to Cart' }).first()).toBeVisible()
        const closeModalBtn = customerPage.getByRole('button', { name: 'Close' }).first()
        await closeModalBtn.click()
    }

    async goToCartPage({ optionsSelectors, optionsSelectorsCount }) {
        await customerPage.goto(`${customerUrl}/shop/main/cart`)
        optionsSelectors = await customerPage.locator('#body-content').getByRole('combobox')
        optionsSelectorsCount = await optionsSelectors.count()
        return { optionsSelectors, optionsSelectorsCount }
    }

    async changeQuantity({ optionsSelectors, optionsSelectorsCount }) {
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 5)
        await qtyOptions.selectOption('1').then(async () => {
            await checkApi({ page: customerPage, url: '/api' })
        })
    }

    async changeDesination({ optionsSelectors, optionsSelectorsCount }) {
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 4)
        await qtyOptions.selectOption('US').then(async () => {
            await checkApi({ page: customerPage, url: '/api' })
        })
    }

    async selfPickup({ optionsSelectors, optionsSelectorsCount }) {
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 2)
        const optionCount = await qtyOptions.locator('option').count()
        await qtyOptions.selectOption({ index: optionCount - 1 }).then(async () => {
            await checkApi({ page: customerPage, url: '/api' })
        })
    }

    async faceTofacePickup({ optionsSelectors, optionsSelectorsCount }) {
        const deliveryMethodOptions = optionsSelectors.nth(optionsSelectorsCount - 3)
        await deliveryMethodOptions.selectOption('FACE_TO_FACE_PICKUP').then(async () => {
            await checkApi({ page: customerPage, url: '/api' })
        })
    }

    async showPaymentDetails() {
        const showDetailsBtn = await customerPage.getByRole('link', { name: 'Show Details' }).first()
        await showDetailsBtn.click()
        await expect(customerPage.locator('#payment-modal___BV_modal_content_').first()).toBeVisible()
        await customerPage.getByRole('button', { name: '×' }).first().click()
        await expect(customerPage.locator('#payment-modal___BV_modal_content_').first()).toBeVisible({ visible: false })
    }

    async offlineCheckout() {
        await customerPage.getByLabel('Offline Payment').check()
        await testBtnByName({ page: customerPage, name: 'Place Order' })
        await expect(customerPage.getByRole('heading', { name: 'Thanks for your order' }).first()).toBeVisible()
    }

    async onlineCheckout() {
        await customerPage.getByLabel('Online Payment').check()
        await testBtnByName({ page: customerPage, name: 'Place Order' })
        await expect(customerPage.getByRole('heading', { name: '請選擇付款方法' }).first()).toBeVisible()
    }

    async pinkiePayCheckout() {
        await customerPage.getByRole('link').first().click()
        await expect(customerPage.getByRole('heading', { name: '請輸入您的信用卡資料' }).first()).toBeVisible()

        const iframe = await customerPage.frameLocator('iframe').first();
        const inputs = await iframe.locator('input[type=text]')

        await inputs.nth(0).fill(cardNumber)
        await inputs.nth(1).fill(expiryDate)
        await inputs.nth(2).fill(cvv)

        const submitBtn = await customerPage.getByRole('button', { name: '立即付款' }).first()

        await submitBtn.click()
        await expect(customerPage.getByRole('heading', { name: 'Thanks for your order' }).first()).toBeVisible()
    }

    async renderAllOrders() {
        await goToPage({ page: customerPage, path: 'account/main-store-order', type: 'customer' })
    }

    async clickFirstOrder() {
        const orderLinks = await customerPage.getByRole('link', { name: '#' })
        if (await orderLinks.first().isVisible()) {
            await orderLinks.first().click()
            await expect(customerPage.getByRole('heading', { name: 'Order Details' }).first()).toBeVisible()

            const currentUrl = customerPage.url()
            let orderId = currentUrl.split('shop/main/order/')[1]
            return orderId
        }
    }

    async uploadPaymentProof() {
        await testUploadBtn({ page: customerPage, image: './dummy/bank_slip.jpeg', })
        await new Promise(r => setTimeout(r, 5000));
        await customerPage.getByRole('button', { name: 'View Payment Record' }).first().click()
        await testBtnByName({ page: customerPage, name: 'Refresh', timeout: 30000 })
    }

    async fillVoucherCode() {
        const voucherCodeForm = await customerPage.locator('#voucher-code').first()
        await voucherCodeForm.fill('WELCOMEVOUCHER')
        await testBtnByName({ page: customerPage, name: 'Apply' })
    }

    async fillDeliveryDetails({ optionsSelectors, optionsSelectorsCount }) {
        // Fill Name and Email
        await fillAllInputs({ page: customerPage })

        // Fill Phone
        const phoneInput = await customerPage.getByPlaceholder('Phone').first()
        await phoneInput.fill(randomStr(8))

        // Fill Area Code
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 2)
        await qtyOptions.selectOption('852')

    }

    async confirmOrderCompletion({ orderId }) {
        await customerPage.goto(`${customerUrl}/shop/main/order/${orderId}`)
        await testBtnByName({ page: customerPage, name: 'Confirm Completion' })
    }

    async rateProducts() {
        await customerPage.getByRole('button', { name: 'Rate Products' }).first().click()
        await testBtnByName({ page: customerPage, name: 'Submit Reviews' })
    }

}

class Admin {
    async login() {
        await adminPage.goto(`${adminUrl}/authentication/login`)
        let inputs = await adminPage.locator('input.uk-input')
        await inputs.nth(0).fill('su@starsnet.com.hk')
        await inputs.nth(1).fill('Password12345')
        await testBtnByName({ page: adminPage, name: 'Login' })
    }

    async renderOrderDetails({ orderId }) {
        await adminPage.goto(`${adminUrl}/shop/online/order/details?_id=${orderId}`)
        await expect(adminPage.locator('div.sc-top-bar-content').first()).toBeVisible()
    }

    async approveBankSlip() {
        await adminPage.getByRole('button', { name: 'View Bank Receipt' }).first().click()
        await expect(adminPage.getByText('Offline Payment Approval').nth(1)).toBeVisible()
        await testBtnByName({ page: adminPage, name: 'Approve' })
    }

    async updateOrderStatus() {
        const selects = await adminPage.locator('#select2--container').nth(0);
        const selectResults = await adminPage.locator('id=select2--results');
        await selects.click()
        await adminPage.getByRole('option', { name: 'Ready to pickup' }).first().click().then(async () => {
            await checkApi({ page: adminPage, url: '/api' })
        })
    }
}

test.describe.serial('Offline', () => {

    test.afterEach(async () => {
        await screenshot({ test, page: customerPage, filename: `order-offline-flow/${steps}-${customerPage.url()}` })
        await screenshot({ test, page: adminPage, filename: `order-offline-flow/${steps}-${adminPage.url()}` })
        steps++
    })


    let optionsSelectors
    let optionsSelectorsCount
    let orderId
    let steps = 0


    const customer = new Customer()
    const admin = new Admin()

    /**
     * Customer
     */
    test('Customer: Register', async () => {
        await customer.register()
    })

    test('Customer: Go to All Products', async () => {
        await customer.allProducts()
    })

    test('Customer: Add to Cart', async () => {
        await customer.addToCart()
    })

    test('Customer: Go To Cart Page', async () => {
        ({ optionsSelectors, optionsSelectorsCount } = await customer.goToCartPage({ optionsSelectors, optionsSelectorsCount }))
    })

    test('Customer: Change Qty', async () => {
        await customer.changeQuantity({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Destination', async () => {
        await customer.changeDesination({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Delivery Method: Self-Pickup', async () => {
        await customer.selfPickup({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Delivery Method: Face-to-Face Pickup', async () => {
        await customer.faceTofacePickup({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Show Payment Details', async () => {
        await customer.showPaymentDetails()
    })

    test('Customer: Fill Voucher Code', async () => {
        await customer.fillVoucherCode()
    })

    test('Customer: Fill Delivery Details', async () => {
        await customer.fillDeliveryDetails({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Offline Checkout', async () => {
        await customer.offlineCheckout()
    })

    test('Customer: Render All Orders', async () => {
        await customer.renderAllOrders()
    })

    test('Customer: Click first Order', async () => {
        orderId = await customer.clickFirstOrder()
    })

    test('Customer: Upload Payment Proof', async () => {
        test.slow()
        await customer.uploadPaymentProof()
    })

    /**
    * Admin
    */
    test('Admin: Login', async () => {
        await admin.login()
    })

    test('Admin: Render Order Details', async () => {
        await admin.renderOrderDetails({ orderId })
    })

    test('Admin: Approve Bank Slip', async () => {
        await admin.approveBankSlip()
    })

    test('Admin Update Order Status', async () => {
        await admin.updateOrderStatus()
    })

    /**
     * Customer
     */

    test('Customer: Confirm Order Completion', async () => {
        await customer.confirmOrderCompletion({ orderId })
    })

    test('Customer: Rate Products', async () => {
        await customer.rateProducts()
    })



})

test.describe.serial('Online', () => {
    test.afterEach(async () => {
        await screenshot({ test, page: customerPage, filename: `order-online-flow/${steps}-${customerPage.url()}` })
        await screenshot({ test, page: adminPage, filename: `order-online-flow/${steps}-${adminPage.url()}` })
        steps++
    })

    let optionsSelectors
    let optionsSelectorsCount
    let orderId
    let steps = 0

    const customer = new Customer()
    const admin = new Admin()

    /**
     * Customer
     */
    test('Customer: Register', async () => {
        await customer.register()
    })

    test('Customer: Go to All Products', async () => {
        await customer.allProducts()
    })

    test('Customer: Add to Cart', async () => {
        await customer.addToCart()
    })

    test('Customer: Go To Cart Page', async () => {
        ({ optionsSelectors, optionsSelectorsCount } = await customer.goToCartPage({ optionsSelectors, optionsSelectorsCount }))
    })

    test('Customer: Change Qty', async () => {
        await customer.changeQuantity({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Destination', async () => {
        await customer.changeDesination({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Delivery Method: Self-Pickup', async () => {
        await customer.selfPickup({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Delivery Method: Face-to-Face Pickup', async () => {
        await customer.faceTofacePickup({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Show Payment Details', async () => {
        await customer.showPaymentDetails()
    })

    test('Customer: Fill Voucher Code', async () => {
        await customer.fillVoucherCode()
    })

    test('Customer: Fill Delivery Details', async () => {
        await customer.fillDeliveryDetails({ optionsSelectors, optionsSelectorsCount })
    })

    test('Customer: Online Checkout', async () => {
        await customer.onlineCheckout()
    })

    test('Customer: Pinkie Pay', async () => {
        await customer.pinkiePayCheckout()
    })

    test('Customer: Render All Orders', async () => {
        await customer.renderAllOrders()
    })

    test('Customer: Click first Order', async () => {
        orderId = await customer.clickFirstOrder()
    })


    /**
    * Admin
    */
    test('Admin: Login', async () => {
        await admin.login()
    })

    test('Admin: Render Order Details', async () => {
        await admin.renderOrderDetails({ orderId })
    })

    test('Admin Update Order Status', async () => {
        await admin.updateOrderStatus()
    })

    /**
     * Customer
     */

    test('Customer: Confirm Order Completion', async () => {
        await customer.confirmOrderCompletion({ orderId })
    })

    test('Customer: Rate Products', async () => {
        await customer.rateProducts()
    })
})

