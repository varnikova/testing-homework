import { BASEURL, getPageUrl } from '..'
import { ExampleApi } from '../../src/client/api'

const api = new ExampleApi(BASEURL)

describe('Cart', () => {
	it('should clear cart on clear button click', async ({ browser }) => {
		const productId = await api.getProducts().then(r => r.data[0].id)

		await browser.url(`${BASEURL}/catalog/${productId}`)

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		await addToCart.click()

		await browser.url(`${BASEURL}/cart`)

		const clearCart = await browser.$('.Cart-Clear')

		await clearCart.click()

		const cartTable = await browser.$('.Cart-Table')

		expect(cartTable).not.toBePresent()
	})

	it('should allow user to checkout and show success message', async ({
		browser,
	}) => {
		const productId = await api.getProducts().then(r => r.data[0].id)

		await browser.url(getPageUrl(`/catalog/${productId}`))

		const addToCart = await browser.$('.ProductDetails-AddToCart')

		await addToCart.click()

		await browser.url(getPageUrl('/cart'))

		const nameInput = browser.$('#f-name')
		const phoneInput = browser.$('#f-phone')
		const addressInput = browser.$('#f-address')
		const submitButton = await browser.$('.Form-Submit')

		await nameInput.setValue('TestName')
		await phoneInput.setValue('79000000000')
		await addressInput.setValue('test@yandex.ru')

		await submitButton.click()

		const message = await browser.$('.Cart-SuccessMessage.alert-success')
		const cartNumber = await browser.$('.Cart-Number').getText()

		await message.waitForDisplayed()

		expect(message).toBeDisplayed()
		expect(cartNumber).toEqual('1')
	})
})
