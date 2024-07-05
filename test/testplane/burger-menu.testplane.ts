import { BASEURL } from '../index'

describe('Burger Menu', function () {
	it('should collapse into burger menu at width < 576px', async ({
		browser,
	}) => {
		browser.setWindowSize(575, 1000)
		await browser.url(BASEURL)

		const toggle = await browser.$("[aria-label='Toggle navigation']")
		const menuLinks = await browser.$$('nav a.nav-link')

		await expect(toggle).toBeDisplayedInViewport()
		await expect(menuLinks).not.toBeDisplayedInViewport()
	})

	it('should open menu on toggle click', async ({ browser }) => {
		browser.setWindowSize(575, 1000)
		await browser.url(BASEURL)

		const toggle = await browser.$("[aria-label='Toggle navigation']")
		const menuLinks = await browser.$$('nav a.nav-link')

		toggle.click()

		await expect(menuLinks).toBeDisplayedInViewport()
	})

	it('should close menu on menu item click', async ({ browser }) => {
		browser.setWindowSize(575, 1000)
		await browser.url(BASEURL)

		const toggle = await browser.$("[aria-label='Toggle navigation']")
		const menuLinks = await browser.$$('nav a.nav-link')

		toggle.click()
		menuLinks[0].click()

		await expect(menuLinks).not.toBeDisplayedInViewport()
	})

	it('should close menu on toggle click', async ({ browser }) => {
		browser.setWindowSize(575, 1000)
		await browser.url(BASEURL)

		const toggle = await browser.$("[aria-label='Toggle navigation']")
		const menuLinks = await browser.$$('nav a.nav-link')

		toggle.click()
		toggle.click()

		await expect(menuLinks).not.toBeDisplayedInViewport()
	})
})
