import { getPageUrl } from '..'

describe('Screenshots', () => {
	it('home page satisfies screenshots', async ({ browser }) => {
		await browser.url(getPageUrl('/'))

		const page = await browser.$('.Home')
		await page.assertView('plain', {
			ignoreDiffPixelCount: '5%',
		})
	})

	it('catalog page satisfies screenshots', async ({ browser }) => {
		await browser.execute(() => localStorage.clear())

		await browser.url(getPageUrl('/catalog'))

		const page = await browser.$('.Catalog')
		await page.assertView('plain', {
			ignoreDiffPixelCount: '5%',
		})
	})

	it('product page satisfies screenshots', async ({ browser }) => {
		await browser.execute(() => localStorage.clear())

		await browser.url(getPageUrl('/catalog/1'))

		const page = await browser.$('.Product')
		await page.assertView('plain', {
			ignoreDiffPixelCount: '5%',
		})
	})

	it('delivery page satisfies screenshots', async ({ browser }) => {
		await browser.url(getPageUrl('/delivery'))

		const page = await browser.$('.Delivery')
		await page.assertView('plain', {
			ignoreDiffPixelCount: '5%',
		})
	})

	it('contacts page satisfies screenshots', async ({ browser }) => {
		await browser.url(getPageUrl('/contacts'))

		const page = await browser.$('.Contacts')
		await page.assertView('plain', {
			ignoreDiffPixelCount: '5%',
		})
	})

	it('cart page satisfies screenshots', async ({ browser }) => {
		await browser.execute(() => localStorage.clear())

		await browser.url(getPageUrl('/cart'))

		const page = await browser.$('.Cart')
		await page.assertView('plain', {
			ignoreDiffPixelCount: '5%',
		})
	})
})
