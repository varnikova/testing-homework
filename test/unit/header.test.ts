import { it, describe, expect } from '@jest/globals'
import { render } from '@testing-library/react'
import { initApp } from './helpers'
import { BASENAME } from '../index'

describe('Header', () => {
	it('should have links to catalog, cart, contacts, delivery', () => {
		const app = initApp()
		render(app)

		const navLinks = Array.from(document.querySelectorAll('nav a.nav-link'))
			.map((l: any) => l.href.split('/').at(-1))
			.sort()

		const expectedLinks = ['catalog', 'cart', 'contacts', 'delivery'].sort()

		expect(navLinks).toEqual(expectedLinks)
	})

	it('should have brand name leading to home page', () => {
		const app = initApp()
		const { container } = render(app)

		const logo = container.querySelector('a.navbar-brand')!

		expect(logo.getAttribute('href')).toEqual(BASENAME)
	})
})
