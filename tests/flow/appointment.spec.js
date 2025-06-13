const { test, expect, chromium } = require('@playwright/test');
const { guest } = require('../../utils/login');
import checkApi from '../../utils/checkApi';
import goToPage from '../../utils/goToPage';
import { clickCheckbox, fillAllTextAreas } from '../../utils/input';
import {
    testBtnByName,
    testUploadBtn,
    testCreateBtn,
    testSaveOrSaveAsActiveBtn,
    testNextBtn,
} from '../../utils/button';
import { fillAllInputs, fillAdminDatePickerWithMonth } from '../../utils/input';
import { randomStr } from '../../utils/random';
import screenshot from '../../utils/screenshot';

let adminPage;
let customerPage;

const adminUrl = `${process.env.ADMIN_URL}/en/@app`;
const customerUrl = process.env.CUSTOMER_URL;

const cardNumber = '1234123412341234';
const expiryDate = '1234';
const cvv = '123';

test.beforeAll(async ({ browser }) => {
    customerPage = await browser.newPage();
    adminPage = await browser.newPage();
});

class Customer {
    async register() {
        await customerPage.goto(`${customerUrl}/authentication/register/email`);
        let inputs = await customerPage.locator('input.form-control');
        await inputs.nth(0).fill(`${randomStr(5)}@gmail.com.hk`);
        await inputs.nth(1).fill('Customer');
        await inputs.nth(2).fill('Password12345');
        await inputs.nth(3).fill('Password12345');
        await customerPage
            .getByRole('button', { name: 'Create An Account' })
            .first()
            .click()
            .then(async () => {
                await checkApi({ page: customerPage, url: '/api' });
            });

        // Wait for the rest of the APIs to finish
        await new Promise((r) => setTimeout(r, 2000));
    }

    async allProducts() {
        await customerPage.goto(`${customerUrl}/shop/mini/product`);
        const sortOptions = await customerPage
            .locator('#body-content select')
            .first();
        await sortOptions.selectOption('from-old-to-new').then(async () => {
            await checkApi({ page: customerPage, url: '/api' });
        });
    }

    async goToProductDetailsPage() {
        const product = await customerPage
            .locator('#body-content .product-box')
            .first()
            .getByRole('link')
            .nth(0);
        await product.click().then(async () => {
            await checkApi({ page: customerPage, url: '/api' });
        });
        await expect(
            customerPage.getByRole('heading', { name: 'Description' }).first()
        ).toBeVisible();
    }

    async addToCart() {
        await testBtnByName({ page: customerPage, name: 'Book' });
        await expect(
            customerPage
                .getByRole('heading', { name: 'Booking Options' })
                .first()
        ).toBeVisible();
    }

    async countOptionSelectors({ optionsSelectors, optionsSelectorsCount }) {
        optionsSelectors = await customerPage
            .locator('#body-content')
            .getByRole('combobox');
        optionsSelectorsCount = await optionsSelectors.count();
        return { optionsSelectors, optionsSelectorsCount };
    }

    async changeDate() {
        const datePicker = await customerPage.locator('#date').first();
        await datePicker.click();
        const datePickerDialog = await customerPage
            .locator('#date__dialog_')
            .first();
        await expect(datePickerDialog).toBeVisible();
        const nextMonthBtn = await customerPage
            .getByRole('button', { name: 'Next month' })
            .first();
        await nextMonthBtn.click();

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const days = [5, 15, 28];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const nextMonth = months[currentDate.getMonth() + 1];
        for (const day of days) {
            const pattern = `${nextMonth} ${day}, ${currentYear}`;
            var regexp = new RegExp(pattern, 'g');
            const btn = await customerPage
                .getByRole('button', { name: regexp })
                .first();
            if (await btn.isEnabled()) {
                await btn.click();
                return { month: nextMonth, day, year: currentYear };
            }
        }
    }

    async changeTimeslot({ optionsSelectors, optionsSelectorsCount }) {
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 3);
        const optionCount = await qtyOptions.locator('option').count();
        await qtyOptions
            .selectOption({ index: optionCount - 1 })
            .then(async () => {
                await checkApi({ page: customerPage, url: '/api' });
            });
        const timeslot = await qtyOptions.inputValue();
        return timeslot;
    }

    async changeCourier({
        optionsSelectors,
        optionsSelectorsCount,
        courierId,
    }) {
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 2);
        await qtyOptions.selectOption(courierId).then(async () => {
            await checkApi({ page: customerPage, url: '/api' });
        });
    }

    async delivery({ optionsSelectors, optionsSelectorsCount }) {
        test.skip();
        const deliveryMethodOptions = await optionsSelectors.nth(
            optionsSelectorsCount - 4
        );
        await deliveryMethodOptions.selectOption('DELIVERY').then(async () => {
            await checkApi({ page: customerPage, url: '/api' });
        });
    }

    async selfPickup({ optionsSelectors, optionsSelectorsCount }) {
        test.skip();
        const deliveryMethodOptions = await optionsSelectors.nth(
            optionsSelectorsCount - 4
        );
        await deliveryMethodOptions
            .selectOption('SELF_PICKUP')
            .then(async () => {
                await checkApi({ page: customerPage, url: '/api' });
            });
    }

    async changeLocation({ optionsSelectors, optionsSelectorsCount }) {
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 1);
        const optionCount = await qtyOptions.locator('option').count();
        await qtyOptions
            .selectOption({ index: optionCount - 1 })
            .then(async () => {
                await checkApi({ page: customerPage, url: '/api' });
            });
    }

    async showPaymentDetails() {
        const showDetailsBtn = await customerPage
            .getByRole('link', { name: 'Show Details' })
            .first();
        await showDetailsBtn.click();
        await expect(
            customerPage.locator('#payment-modal___BV_modal_content_').first()
        ).toBeVisible();
        await customerPage.getByRole('button', { name: '×' }).first().click();
        await expect(
            customerPage.locator('#payment-modal___BV_modal_content_').first()
        ).toBeVisible({ visible: false });
    }

    async offlineCheckout() {
        const offlineRadioBtn = await customerPage.getByLabel(
            'Offline Payment'
        );
        if (!(await offlineRadioBtn.isVisible())) {
            test.skip();
        }
        await offlineRadioBtn.check();
        await testBtnByName({ page: customerPage, name: 'Book Now' });
        await expect(
            customerPage
                .getByRole('heading', { name: 'Thanks for your order' })
                .first()
        ).toBeVisible();
    }

    async onlineCheckout() {
        const onlineRadioBtn = await customerPage.getByLabel('Online Payment');
        if (!(await onlineRadioBtn.isVisible())) {
            test.skip();
        }
        await onlineRadioBtn.check();
        await testBtnByName({ page: customerPage, name: 'Place Order' });
        await expect(
            customerPage
                .getByRole('heading', { name: '請選擇付款方法' })
                .first()
        ).toBeVisible();
    }

    async pinkiePayCheckout() {
        await customerPage.getByRole('link').first().click();
        await expect(
            customerPage
                .getByRole('heading', { name: '請輸入您的信用卡資料' })
                .first()
        ).toBeVisible();

        const iframe = await customerPage.frameLocator('iframe').first();
        const inputs = await iframe.locator('input[type=text]');

        await inputs.nth(0).fill(cardNumber);
        await inputs.nth(1).fill(expiryDate);
        await inputs.nth(2).fill(cvv);

        const submitBtn = await customerPage
            .getByRole('button', { name: '立即付款' })
            .first();

        await submitBtn.click();
        await expect(
            customerPage
                .getByRole('heading', { name: 'Thanks for your order' })
                .first()
        ).toBeVisible();
    }

    async renderAllOrders() {
        await customerPage.goto(`${customerUrl}/account/appointment`);
    }

    async clickFirstOrder() {
        const orderLinks = await customerPage.getByRole('link', { name: '#' });
        if (await orderLinks.first().isVisible()) {
            await orderLinks.first().click();
            await expect(
                customerPage
                    .getByRole('heading', { name: 'My Booking' })
                    .first()
            ).toBeVisible();

            const currentUrl = customerPage.url();
            let orderId = currentUrl.split('shop/mini/order/')[1];
            return orderId;
        }
    }

    async uploadPaymentProof() {
        await testUploadBtn({
            page: customerPage,
            image: './dummy/bank_slip.jpeg',
        });
        await new Promise((r) => setTimeout(r, 5000));
        await customerPage
            .getByRole('button', { name: 'View Payment Record' })
            .first()
            .click();
        await testBtnByName({
            page: customerPage,
            name: 'Refresh',
            timeout: 30000,
        });
    }

    async fillVoucherCode() {
        const voucherCodeForm = await customerPage
            .locator('#voucher-code')
            .first();
        if (await voucherCodeForm.isVisible()) {
            await voucherCodeForm.fill('WELCOMEVOUCHER');
            await testBtnByName({ page: customerPage, name: 'Apply' });
        } else {
            test.skip();
        }
    }

    async fillDeliveryDetails({ optionsSelectors, optionsSelectorsCount }) {
        // Fill Name and Email
        await fillAllInputs({ page: customerPage });

        // Fill Phone
        const phoneInput = await customerPage.getByPlaceholder('Phone').first();
        await phoneInput.fill(randomStr(8));

        // Fill Area Code
        const qtyOptions = optionsSelectors.nth(optionsSelectorsCount - 1);
        await qtyOptions.selectOption('852');
    }

    async confirmOrderCompletion({ orderId }) {
        await customerPage.goto(`${customerUrl}/shop/mini/order/${orderId}`);
        await testBtnByName({ page: customerPage, name: 'Confirm Completion' });
    }
}

class Admin {
    async login() {
        await adminPage.goto(`${adminUrl}/authentication/login`);
        let inputs = await adminPage.locator('input.uk-input');
        await inputs.nth(0).fill('su@starsnet.com.hk');
        await inputs.nth(1).fill('Password12345');
        await testBtnByName({ page: adminPage, name: 'Login' });
    }

    async renderOrderDetails({ orderId }) {
        await adminPage.goto(`${adminUrl}/appointment/details?_id=${orderId}`);
        await expect(
            adminPage.locator('div.sc-top-bar-content').first()
        ).toBeVisible();
    }

    async approveBankSlip() {
        await adminPage
            .getByRole('button', { name: 'View Bank Receipt' })
            .first()
            .click();
        await expect(
            adminPage.getByText('Offline Payment Approval').nth(1)
        ).toBeVisible();
        await testBtnByName({ page: adminPage, name: 'Approve' });
    }

    async renderEmployeePage() {
        await adminPage.goto(`${adminUrl}/appointment/employee`);
        await expect(
            adminPage.locator('div.sc-top-bar-content').first()
        ).toBeVisible();
    }

    async createEmployee() {
        await testCreateBtn({ page: adminPage });
        await expect(adminPage.locator('input.uk-input').first()).toBeVisible();
        const currentUrl = adminPage.url();
        let courierId = currentUrl.split(
            'appointment/employee/details?_id='
        )[1];
        return courierId;
    }

    async updateEmployeeDetails() {
        await fillAllInputs({ page: adminPage });
        await fillAllTextAreas({ page: adminPage });
        await testUploadBtn({ page: adminPage });
        await testSaveOrSaveAsActiveBtn({ page: adminPage });
    }

    async renderAppointmentMatchingPage() {
        await adminPage.goto(`${adminUrl}/appointment/appointment`);
        await expect(
            adminPage.locator('div.sc-top-bar-content').first()
        ).toBeVisible();
        // await expect(adminPage.locator('div.wizard').first()).toBeVisible();
    }

    async updateAppointmentInformation() {
        const selects = await adminPage.locator('#select2--container').first();
        const selectOptions = await adminPage
            .locator('id=select2--results')
            .first()
            .locator('li.select2-results__option');
        await selects.click();
        await selectOptions.first().click();

        await fillAllInputs({ page: adminPage });
        // await testNextBtn({ page: adminPage, nth: 0 });
        // await expect(adminPage.getByRole('strong').first()).toHaveText(
        //     'Employee'
        // );
    }

    async selectEmployee({ month, day, timeslot, year }) {
        const select = await adminPage.locator('#select2--container').nth(3);
        const selectResults = await adminPage.locator('id=select2--results');
        await select.click();
        await selectResults
            .nth(0)
            .locator('li.select2-results__option')
            .nth(0)
            .click();

        const [start, end] = timeslot.split(' - ');
        await fillAdminDatePickerWithMonth({
            page: adminPage,
            nth: 0,
            month,
            day,
            hour: start.split(':')[0],
            year,
        });
        await fillAdminDatePickerWithMonth({
            page: adminPage,
            nth: 1,
            month,
            day,
            hour: end.split(':')[0],
            year,
        });
        await testSaveOrSaveAsActiveBtn({ page: adminPage });
        // await testNextBtn({ page: adminPage, nth: 0 });
        // await expect(adminPage.getByRole('strong').first()).toHaveText(
        //     'Appointment'
        // );
    }

    async appointmentConfirmation() {
        await testNextBtn({ page: adminPage, nth: 0 });
    }

    async appointmentSuccessful() {
        await expect(
            adminPage.locator('i.mdi-check-circle-outline').first()
        ).toBeVisible();
    }

    async renderAppointedEmployeeDetails({ courierId }) {
        await adminPage.goto(
            `${adminUrl}/appointment/details?_id=${courierId}`
        );
        await expect(
            adminPage.locator('div.sc-top-bar-content').first()
        ).toBeVisible();
    }
}

test.describe.serial('Offline', () => {
    test.afterEach(async () => {
        await screenshot({
            test,
            page: customerPage,
            filename: `appointment-offline-flow/${steps}-${customerPage.url()}`,
        });
        await screenshot({
            test,
            page: adminPage,
            filename: `appointment-offline-flow/${steps}-${adminPage.url()}`,
        });
        steps++;
    });

    let optionsSelectors;
    let optionsSelectorsCount;
    let orderId;
    let steps = 0;
    let courierId;
    let month;
    let day;
    let year;
    let timeslot;

    const customer = new Customer();
    const admin = new Admin();

    /**
     * Admin
     */
    test('Admin: Login', async () => {
        await admin.login();
    });

    test('Admin: Render Employee Page', async () => {
        await admin.renderEmployeePage();
    });

    test('Admin: Create Employee', async () => {
        courierId = await admin.createEmployee();
    });

    test('Admin: Update Employee Details', async () => {
        await admin.updateEmployeeDetails();
    });

    /**
     * Customer
     */
    test('Customer: Register', async () => {
        await customer.register();
    });

    test('Customer: Go to All Products', async () => {
        await customer.allProducts();
    });

    test('Customer: Go to Product Details Page', async () => {
        await customer.goToProductDetailsPage();
    });

    test('Customer: Add to Cart', async () => {
        await customer.addToCart();
    });

    test('Customer: Count Number of Option Selectors', async () => {
        ({ optionsSelectors, optionsSelectorsCount } =
            await customer.countOptionSelectors({
                optionsSelectors,
                optionsSelectorsCount,
            }));
    });

    test('Customer: Delivery Method: Self-Pickup', async () => {
        await customer.selfPickup({ optionsSelectors, optionsSelectorsCount });
    });

    test('Customer: Change Date', async () => {
        ({ month, day, year } = await customer.changeDate());
    });

    test('Customer: Change Timeslot', async () => {
        timeslot = await customer.changeTimeslot({
            optionsSelectors,
            optionsSelectorsCount,
        });
    });

    test('Customer: Delivery Method: Delivery', async () => {
        await customer.delivery({ optionsSelectors, optionsSelectorsCount });
    });

    test('Customer: Change Courier', async () => {
        await customer.changeCourier({
            optionsSelectors,
            optionsSelectorsCount,
            courierId,
        });
    });

    test('Customer: Show Payment Details', async () => {
        await customer.showPaymentDetails();
    });

    test('Customer: Fill Voucher Code', async () => {
        await customer.fillVoucherCode();
    });

    test('Customer: Fill Delivery Details', async () => {
        await customer.fillDeliveryDetails({
            optionsSelectors,
            optionsSelectorsCount,
        });
    });

    test('Customer: Offline Checkout', async () => {
        await customer.offlineCheckout();
    });

    test('Customer: Render All Orders', async () => {
        await customer.renderAllOrders();
    });

    test('Customer: Click first Order', async () => {
        orderId = await customer.clickFirstOrder();
    });

    test('Customer: Upload Payment Proof', async () => {
        test.slow();
        await customer.uploadPaymentProof();
    });

    /**
     * Admin
     */
    test('Admin: Render Order Details', async () => {
        test.slow();
        await admin.renderOrderDetails({ orderId });
    });

    test('Admin: Approve Bank Slip', async () => {
        await admin.approveBankSlip();
    });

    test('Admin: Render Appointment Matching Page', async () => {
        await admin.renderAppointmentMatchingPage();
    });

    test('Admin: Appointment Matching Page: Step 1 Fill in Details', async () => {
        test.slow();
        await admin.updateAppointmentInformation();
    });

    test('Admin: Appointment Matching Page: Step 2 Select Employee and Datetime', async () => {
        await admin.selectEmployee({ month, day, timeslot, year });
    });

    // test('Admin: Appointment Matching Page: Step 3 Confirmation', async () => {
    //     await admin.appointmentConfirmation();
    // });

    // test('Admin: Appointment Matching Page: Step 4 Success Page', async () => {
    //     await admin.appointmentSuccessful();
    // });

    test('Admin: Render Employee Details', async () => {
        await admin.renderAppointedEmployeeDetails({ courierId });
    });

    /**
     * Customer
     */

    // test('Customer: Confirm Order Completion', async () => {
    //     await customer.confirmOrderCompletion({ orderId });
    // });
});

test.describe.serial('Online', () => {
    test.afterEach(async () => {
        await screenshot({
            test,
            page: customerPage,
            filename: `appointment-online-flow/${steps}-${customerPage.url()}`,
        });
        await screenshot({
            test,
            page: adminPage,
            filename: `appointment-online-flow/${steps}-${adminPage.url()}`,
        });
        steps++;
    });

    let optionsSelectors;
    let optionsSelectorsCount;
    let orderId;
    let steps = 0;
    let courierId;
    let month;
    let day;
    let year;
    let timeslot;

    const customer = new Customer();
    const admin = new Admin();

    /**
     * Admin
     */
    test('Admin: Login', async () => {
        await admin.login();
    });

    test('Admin: Render Employee Page', async () => {
        await admin.renderEmployeePage();
    });

    test('Admin: Create Employee', async () => {
        courierId = await admin.createEmployee();
    });

    test('Admin: Update Employee Details', async () => {
        await admin.updateEmployeeDetails();
    });

    /**
     * Customer
     */
    test('Customer: Register', async () => {
        await customer.register();
    });

    test('Customer: Go to All Products', async () => {
        await customer.allProducts();
    });

    test('Customer: Go to Product Details Page', async () => {
        await customer.goToProductDetailsPage();
    });

    test('Customer: Add to Cart', async () => {
        await customer.addToCart();
    });

    test('Customer: Count Number of Option Selectors', async () => {
        ({ optionsSelectors, optionsSelectorsCount } =
            await customer.countOptionSelectors({
                optionsSelectors,
                optionsSelectorsCount,
            }));
    });

    test('Customer: Delivery Method: Self-Pickup', async () => {
        await customer.selfPickup({ optionsSelectors, optionsSelectorsCount });
    });

    test('Customer: Change Date', async () => {
        ({ month, day, year } = await customer.changeDate());
    });

    test('Customer: Change Timeslot', async () => {
        timeslot = await customer.changeTimeslot({
            optionsSelectors,
            optionsSelectorsCount,
        });
    });

    test('Customer: Delivery Method: Delivery', async () => {
        await customer.delivery({ optionsSelectors, optionsSelectorsCount });
    });

    test('Customer: Change Courier', async () => {
        await customer.changeCourier({
            optionsSelectors,
            optionsSelectorsCount,
            courierId,
        });
    });

    test('Customer: Show Payment Details', async () => {
        await customer.showPaymentDetails();
    });

    test('Customer: Fill Voucher Code', async () => {
        await customer.fillVoucherCode();
    });

    test('Customer: Fill Delivery Details', async () => {
        await customer.fillDeliveryDetails({
            optionsSelectors,
            optionsSelectorsCount,
        });
    });

    test('Customer: Online Checkout', async () => {
        await customer.onlineCheckout();
    });

    test('Customer: Pinkie Pay', async () => {
        await customer.pinkiePayCheckout();
    });

    test('Customer: Render All Orders', async () => {
        await customer.renderAllOrders();
    });

    test('Customer: Click first Order', async () => {
        orderId = await customer.clickFirstOrder();
    });

    /**
     * Admin
     */
    test('Admin: Render Order Details', async () => {
        await admin.renderOrderDetails({ orderId });
    });

    test('Admin: Render Appointment Matching Page', async () => {
        await admin.renderAppointmentMatchingPage();
    });

    test('Admin: Appointment Matching Page: Step 1 Fill in Details', async () => {
        test.slow();
        await admin.updateAppointmentInformation();
    });

    test('Admin: Appointment Matching Page: Step 2 Select Employee and Datetime', async () => {
        await admin.selectEmployee({ month, day, timeslot, year });
    });

    // test('Admin: Appointment Matching Page: Step 3 Confirmation', async () => {
    //     await admin.appointmentConfirmation();
    // });

    // test('Admin: Appointment Matching Page: Step 4 Success Page', async () => {
    //     await admin.appointmentSuccessful();
    // });

    test('Admin: Render Employee Details', async () => {
        await admin.renderAppointedEmployeeDetails({ courierId });
    });

    /**
     * Customer
     */

    // test('Customer: Confirm Order Completion', async () => {
    //     await customer.confirmOrderCompletion({ orderId });
    // });
});
