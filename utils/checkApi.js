const { test, expect } = require('@playwright/test')
import screenshot from "./screenshot";
import { randomStr } from "./random";

export default async function checkApi({ page, url, timeout = 10000 }) {
    return page.waitForResponse(
        response => response.url().includes(url)
            && !response.url().includes('google')
            && response.status() == 200, { timeout })
        .then(async (response) => {
            await screenshot({ test, page, filename: `${response.url()}-api-response` })
        })
}