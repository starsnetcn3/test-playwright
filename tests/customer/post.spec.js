const { test, expect, chromium } = require('@playwright/test')

const { guest } = require('../../utils/login')
import checkApi from "../../utils/checkApi";
import goToPage from "../../utils/goToPage";
import { clickCheckbox, fillAllTextAreas } from '../../utils/input'
import { testBtnByName } from "../../utils/button";

let page

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
})

test.afterAll(async ({ browser }) => {
    await page.close()
})


test.describe('Blogs', () => {
    test.describe.configure({ mode: 'serial' });

    const path = 'blogs'
    test('Render', async () => {
        await goToPage({ page, path, type: 'customer' })
    })

    test('Load More', async () => {
        await testBtnByName({ page, name: 'Load More' })
    })

    test('Search', async () => {
        const searchInput = await page.getByPlaceholder('Search...').first()
        await searchInput.fill('Post')
        await testBtnByName({ page, name: 'Search' })

    })

    test('Sort', async () => {
        const sortOptions = await page.locator('#body-content select').first()
        await sortOptions.selectOption('from-new-to-old').then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })

    test('Filter', async () => {
        await clickCheckbox({ page, nth: 0 })
        await testBtnByName({ page, name: 'Apply Filter' })

    })

})


test.describe('Blog Details', () => {
    test.describe.configure({ mode: 'serial' });

    let currentUrl;

    const path = 'blogs'
    test('Render Blogs', async () => {
        await goToPage({ page, path, type: 'customer' })
    })

    test('Blog Details', async () => {
        const post = await page.locator('.blog-left > a').first()
        await post.click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
        await expect(page.getByRole('heading', { name: 'Related Posts' }).first()).toBeVisible()
        currentUrl = page.url()
    })

    test('F5 Render', async () => {
        await page.goto(currentUrl)
        const navbar = page.getByRole('banner').first()
        await expect(navbar).toBeVisible()
    })

    test('Load More Related Posts', async () => {
        await testBtnByName({ page, name: 'Load More' })

    })

    test('Comment', async () => {
        await fillAllTextAreas({ page })
        await testBtnByName({ page, name: 'Post Comment' })

    })

    test('Like', async ({ }, workerInfo) => {
        if (workerInfo.project.name.includes('Guest')) {
            test.skip()
        }

        const likePostBtn = await page.getByRole('link', { name: 'Like Post' }).first()
        const unlikePostBtn = await page.getByRole('link', { name: 'Unlike Post' }).first()
        if (await likePostBtn.isVisible()) {
            await likePostBtn.click().then(async () => {
                await checkApi({ page, url: '/api' })
            })
        } else if (unlikePostBtn.isVisible()) {
            await unlikePostBtn.click().then(async () => {
                await checkApi({ page, url: '/api' })
            })
        }
    })

    let socialMedias = [
        { name: 'facebook', link: 'facebook', locator: 'i.fa-facebook' },
        { name: 'twitter', link: 'twitter', locator: 'i.fa-twitter' },
        // { name: 'telegram', link: 'me', locator: 'i.fa-telegram' },
        // { name: 'whatsapp', link: 'whatsapp', locator: 'i.fa-whatsapp' },
        // { name: 'pinterest', link: 'pinterest', locator: 'i.fa-pinterest' },
    ]

    socialMedias.forEach(socialMedia => {
        test(`${socialMedia.name} Button`, async () => {
            const popupPromise = page.waitForEvent('popup');
            const facebookBtn = await page.locator(socialMedia.locator).first()
            await facebookBtn.click()
            const popup = await popupPromise;
            await popup.waitForLoadState();
            const browserLink = await popup.url()
            expect(browserLink.includes(socialMedia.link)).toBeTruthy()
        })
    });
})