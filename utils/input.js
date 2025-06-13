import {
    randomStr,
    randomAddress,
    randomDescription,
    randomInt,
    randomName,
    randomTitle,
    randomPeople,
} from './random';

const fillOptions = async ({ inputLocator, placeholder = '' }) => {
    if (placeholder.includes('email')) {
        await inputLocator.fill(`${randomStr(10)}@gmail.com`);
    } else if (placeholder.includes('address')) {
        await inputLocator.fill(`${randomAddress()}`);
    } else if (placeholder.includes('title')) {
        await inputLocator.fill(`${randomTitle()}`);
    } else if (placeholder.includes('amount')) {
        await inputLocator.fill(`${randomInt({ min: 500, max: 1000 })}`);
    } else if (placeholder.includes('company')) {
        await inputLocator.fill(`${randomName()} Company`);
    } else if (placeholder.includes('description')) {
        await inputLocator.fill(`${randomDescription()}`);
    } else if (placeholder.includes('name')) {
        await inputLocator.fill(`${randomPeople()}`);
    } else if (placeholder.includes('phone')) {
        await inputLocator.fill(
            `${randomInt({ min: 90000000, max: 99999999 })}`
        );
    } else if (placeholder.includes('number')) {
        await inputLocator.fill(
            `${randomInt({ min: 90000000, max: 99999999 })}`
        );
    } else if (placeholder.includes('point')) {
        await inputLocator.fill('0');
    } else if (placeholder.includes('price')) {
        await inputLocator.fill(`${randomInt({ min: 500, max: 1000 })}`);
    } else if (placeholder.includes('quantity')) {
        await inputLocator.fill(`${randomInt({ min: 100, max: 1000 })}`);
    } else if (placeholder.includes('remarks')) {
        await inputLocator.fill(`${randomDescription()}`);
    } else if (placeholder.includes('Box')) {
        await inputLocator.fill(`${randomInt({ min: 10, max: 20 })}`);
    } else if (placeholder.includes('city')) {
        await inputLocator.fill(`Hong Kong`);
    } else if (placeholder.includes('fee')) {
        await inputLocator.fill(`${randomInt({ min: 25, max: 75 })}`);
    } else if (placeholder.includes('Tracking')) {
        await inputLocator.fill(`${randomStr(20)}`);
    } else if (placeholder.includes('barcode')) {
        await inputLocator.fill(`${randomStr(20)}`);
    } else if (placeholder.includes('cost')) {
        await inputLocator.fill(`${randomInt({ min: 250, max: 499 })}`);
    } else if (placeholder.includes('weight')) {
        await inputLocator.fill(`${randomInt({ min: 2, max: 5 })}`);
    } else if (placeholder.includes('date and time')) {
    } else if (placeholder.includes('value')) {
        await inputLocator.fill(`${randomInt({ min: 250, max: 499 })}`);
    } else if (placeholder.includes('quota')) {
        await inputLocator.fill(`${randomInt({ min: 250, max: 499 })}`);
    } else if (placeholder.includes('duration')) {
        await inputLocator.fill(`${randomInt({ min: 30, max: 90 })}`);
    } else if (placeholder.includes('prefix')) {
        await inputLocator.fill(
            `${randomPeople().split(' ')[0]}${randomInt({ min: 10, max: 40 })}`
        );
    } else if (placeholder.includes('password')) {
        await inputLocator.fill(`Password54321`);
    } else {
        await inputLocator.fill('N/A');
    }
};

const fillAllInputs = async ({ page }) => {
    const textInputs = await page.locator('input[type=text]');
    const emailInputs = await page.locator('input[type=email]');
    const inputs = await textInputs.or(emailInputs);
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
        let input = await inputs.nth(i);
        let value = await input.inputValue();
        if (!(await input.isDisabled()) && (await input.isVisible())) {
            if (!value) {
                let placeholder = await input.getAttribute('placeholder');
                placeholder = placeholder.toLowerCase();
                await fillOptions({ inputLocator: input, placeholder });
            } else if (value == '0') {
                await inputs.nth(i).fill(`${Math.floor(Math.random() * 100)}`);
            }
        }
    }
};

const fillAllTextAreas = async ({ page }) => {
    const textareas = await page.locator('textarea');
    const count = await textareas.count();
    for (let i = 0; i < count; i++) {
        let textarea = await textareas.nth(i);
        if (!(await textarea.isDisabled()) && (await textarea.isVisible())) {
            let placeholder = await textarea.getAttribute('placeholder');
            placeholder = placeholder.toLowerCase();
            await fillOptions({ inputLocator: textarea, placeholder });
        }
    }
};

const fillAllTextAreasWithoutPlaceholder = async ({ page }) => {
    const textareas = await page.locator('textarea');
    const count = await textareas.count();
    for (let i = 0; i < count; i++) {
        let textarea = await textareas.nth(i);
        if (!(await textarea.isDisabled()) && (await textarea.isVisible())) {
            await fillOptions({ inputLocator: textarea });
        }
    }
};

const clickCheckbox = async ({ page, nth = 0 }) => {
    const checkboxes = await page.locator('input[type=checkbox]');
    return await checkboxes.nth(nth).click({ force: true });
};

const fillAllInputsByType = async ({ page }) => {
    const inputs = await page.locator('input');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
        let input = await inputs.nth(i);
        let value = await input.inputValue();
        if (!(await input.isDisabled()) && (await input.isVisible())) {
            if (!value) {
                let type = await input.getAttribute('type');
                type = type.toLowerCase();
                await fillOptions({ inputLocator: input, placeholder: type });
            } else if (value == '0') {
                await inputs.nth(i).fill(`${Math.floor(Math.random() * 100)}`);
            }
        }
    }
};

const clickRadioBtn = async ({ page, name }) => {
    const btn = await page
        .getByRole('listitem')
        .filter({ hasText: name })
        .getByRole('radio');
    await btn.click();
};

const fillDatePicker = async ({ page, nth = 0, date }) => {
    const input = await page
        .getByPlaceholder('Pick a date and time... ')
        .nth(nth);
    await input.click();
    const days = await page
        .locator('span.flatpickr-day')
        .filter({ hasText: date });
    const count = await days.count();
    for (let i = 0; i < count; i++) {
        let day = await days.nth(i);
        if (!(await day.isDisabled()) && (await day.isVisible())) {
            await day.click();
        }
    }
};

const fillAdminDatePickerWithMonth = async ({
    page,
    day,
    nth = 0,
    year = null,
    month = null,
    hour = null,
    minute = null,
}) => {
    const datePicker = await page
        .getByPlaceholder('Pick a date and time... ')
        .nth(nth);
    await datePicker.click();
    if (month) {
        const monthSelector = await page
            .getByRole('combobox', { name: 'Month' })
            .first();
        await monthSelector.selectOption(month);
    } else {
        month = new Date().toLocaleString('default', { month: 'long' });
    }
    if (!year) {
        year = new Date().getFullYear();
    }
    const matchingDay = await page
        .locator(`.flatpickr-day[aria-label="${month} ${day}, ${year}"]`)
        .nth(nth);
    if (await matchingDay.isEnabled()) {
        await matchingDay.click();
    }
    if (hour) {
        const hourInput = await page
            .getByRole('spinbutton', { name: 'Hour' })
            .first();
        await hourInput.fill(`${hour}`);
    }
    if (minute) {
        const minuteInput = await page
            .getByRole('spinbutton', { name: 'Minute' })
            .first();
        await minuteInput.fill(`${minute}`);
    }
};

export {
    fillAllInputs,
    fillAllTextAreas,
    clickCheckbox,
    fillAllInputsByType,
    fillAllTextAreasWithoutPlaceholder,
    clickRadioBtn,
    fillDatePicker,
    fillAdminDatePickerWithMonth,
};
