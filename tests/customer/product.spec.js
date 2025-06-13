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

let productPaths = [
    'shop/main/product',
    'shop/main/wishlist',
    'shop/mini/product'
]

productPaths.forEach(path => {
    test.describe(`Products at ${path}`, () => {
        test.describe.configure({ mode: 'serial' });

        test.skip(({ }, workerInfo) => [
            'shop/main/wishlist',
            'shop/mini/product'].includes(path) &&
            workerInfo.project.name.includes('Guest'))

        test('Render', async () => {
            await goToPage({ page, path, type: 'customer' })
        })

        test('Load More', async () => {
            await testBtnByName({ page, name: 'Load More' })
        })

        test('Search', async () => {
            const searchInput = await page.getByPlaceholder('Search...').first()
            await searchInput.fill('a')
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
            await testBtnByName({ page, name: 'Filter' })
        })

    })
});


test.describe('Product Grid', () => {
    test.describe.configure({ mode: 'serial' });

    let currentUrl;
    const path = 'shop/main/product'

    test.beforeAll(renderAllProductFromOldToNew(path))


    test('Add to Cart', async () => {
        await test.step('Click Add to Cart', async () => {
            await testBtnByName({ page, name: 'Add' })
            await expect(page.getByRole('heading', { name: 'Added to Cart' }).first()).toBeVisible()
        })

        await test.step('Close Modal', async () => {
            const closeModalBtn = page.getByRole('button', { name: 'Close' }).first()
            await closeModalBtn.click()
        })
    })

    test('Add to Wishlist', async ({ }, workerInfo) => {
        if (workerInfo.project.name.includes('Guest')) {
            test.skip()
        }

        const addToWishlistBtn = await page.locator('svg.bi-heart').first()
        await addToWishlistBtn.click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
    })
})


test.describe('Product Details', () => {
    test.describe.configure({ mode: 'serial' });

    let currentUrl;

    const path = 'shop/main/product'
    test.beforeAll(renderAllProductFromOldToNew(path))


    test('Details', async () => {
        const post = await page.locator('.slide > a').first()
        await post.click().then(async () => {
            await checkApi({ page, url: '/api' })
        })
        await expect(page.getByRole('heading', { name: 'Related Products' }).first()).toBeVisible()
        currentUrl = page.url()
    })

    test('F5 Render', async () => {
        await page.goto(currentUrl)
        const navbar = page.getByRole('banner').first()
        await expect(navbar).toBeVisible()
    })

    test('Add to Cart', async () => {
        await test.step('Click Add to Cart', async () => {
            await testBtnByName({ page, name: 'Add to Cart' })
            await expect(page.getByRole('heading', { name: 'Added to Cart' }).first()).toBeVisible()
        })

        await test.step('Close Modal', async () => {
            const closeModalBtn = page.getByRole('button', { name: 'Close' }).first()
            await closeModalBtn.click()
        })
    })

    test('Add to Wishlist', async ({ }, workerInfo) => {
        if (workerInfo.project.name.includes('Guest')) {
            test.skip()
        }
        await testBtnByName({ page, name: 'Add to Wishlist' })

    })

    test('Load More Related Products', async () => {
        await testBtnByName({ page, name: 'Load More' })

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


function renderAllProductFromOldToNew(path) {
    /**
     * In Admin we will:
     * 1. Always increase inventory of oldest product
     * 2. 50 products will be seeded into database
     */
    return async () => {
        await goToPage({ page, path, type: 'customer' });
        const sortOptions = await page.locator('#body-content select').first();
        await sortOptions.selectOption('from-old-to-new').then(async () => {
            await checkApi({ page, url: '/api' });
        });
    };
}
