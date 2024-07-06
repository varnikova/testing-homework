import { ExampleApi } from '../../src/client/api'
import { BASEURL } from '../index'

const api = new ExampleApi(BASEURL)

beforeEach(async ({ browser }) => {
	await browser.execute(() => localStorage.clear())
})

describe('Catalog', () => {
	it('should render products that come from server', async ({ browser }) => {
		await browser.url(`${BASEURL}/catalog`)

		const { data: productsFromServerData } = await api.getProducts()

		const productsFromServer = productsFromServerData.map(p => p.name)

		const products = await Promise.all(
			await browser.$$('.ProductItem-Name').map(p => p.getText()),
		)

		expect(products.sort()).toEqual(productsFromServer.sort())
	})

	it('should show name for each product', async ({ browser }) => {
		await browser.url(`${BASEURL}/catalog`)

		const products = await Promise.all(
			await browser.$$('.ProductItem-Name').map(p => p.getText()),
		)

		expect(products.length).toBeGreaterThan(0)
		products.forEach(p => expect(p).toBeTruthy())
	})

	it('should show price for each product', async ({ browser }) => {
		await browser.url(`${BASEURL}/catalog`)

		const products = await Promise.all(
			await browser.$$('.ProductItem-Price').map(p => p.getText()),
		)

		expect(products.length).toBeGreaterThan(0)
		products.forEach(p => expect(p).toBeTruthy())
	})

	it('should show details link for each product', async ({ browser }) => {
		await browser.url(`${BASEURL}/catalog`)

		const products = await Promise.all(
			await browser
				.$$('.ProductItem-DetailsLink')
				.map(p => p.getAttribute('href')),
		)

		expect(products.length).toBeGreaterThan(0)
		products.forEach(p => expect(p).toBeTruthy())
	})

	it('should show message if product is in cart', async ({ browser }) => {
		const productId = await api.getProducts().then(r => r.data[0].id)

		await browser.url(`${BASEURL}/catalog/${productId}`)

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		await addToCart.click()

		await browser.url(`${BASEURL}/catalog`)

		const message = await browser.$('.CartBadge')

		expect(await message.getText()).toEqual('Item in cart')
	})
})

describe('Product Details Page', () => {
	it('should render Add To Cart button', async ({ browser }) => {
		const productId = await api.getProducts().then(r => r.data[0].id)

		await browser.url(`${BASEURL}/catalog/${productId}`)

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		expect(addToCart.error).toBeUndefined()
	})

	it('should show message if product is in cart', async ({ browser }) => {
		const productId = await api.getProducts().then(r => r.data[0].id)

		await browser.url(`${BASEURL}/catalog/${productId}`)

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		await addToCart.click()

		const message = await browser.$('.CartBadge')

		expect(await message.getText()).toEqual('Item in cart')
	})

	it('should increase product quantity in cart if Add To Cart button clicked multiple times ', async ({
		browser,
	}) => {
		const productId = await api.getProducts().then(r => r.data[0].id)
		const product = await api.getProductById(productId).then(r => r.data)

		await browser.url(`${BASEURL}/catalog/${productId}`)

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		await addToCart.click()
		await addToCart.click()

		await browser.url(`${BASEURL}/cart`)

		const quantity = await browser.$('.Cart-Count').then(r => r.getText())
		expect(parseInt(quantity)).toEqual(2)
	})

	it('should save products in cart on page refresh', async ({ browser }) => {
		const productId = await api.getProducts().then(r => r.data[0].id)

		await browser.url(`${BASEURL}/catalog/${productId}`)

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		await addToCart.click()

		await browser.url(`${BASEURL}/cart`)

		const items = await Promise.all(
			await browser.$$('.Cart-Name').map(p => p.getText()),
		)

		browser.refresh()

		const itemsAfterRefresh = await Promise.all(
			await browser.$$('.Cart-Name').map(p => p.getText()),
		)

		expect(items).toEqual(itemsAfterRefresh)
	})
})
