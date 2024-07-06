import React from 'react'
import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { describe, it, expect } from '@jest/globals'
import { initApp } from './helpers'
import { Cart } from '../../src/client/pages/Cart'
import { render, screen, waitFor } from '@testing-library/react'
import { BASENAME } from '..'
import { CartApi } from '../../src/client/api'

const mockCartData = {
	'1': {
		name: 'Product 1',
		price: 10,
		count: 5,
	},
	'2': {
		name: 'Product 2',
		price: 20,
		count: 10,
	},
}

describe('Cart', () => {
	it('should show message if cart is empty', async () => {
		const app = initApp({
			children: <Cart />,
		})

		render(app)

		const emptyText = await screen.findByText(
			/Cart is empty. Please select products in the/i,
		)
		const catalogLink = await screen.findByText(/catalog/i)

		expect(emptyText).toBeTruthy()
		expect(catalogLink).toBeTruthy()
		expect(catalogLink).toHaveAttribute('href', `${BASENAME}/catalog`)
	})

	it("should render table if cart isn't empty", async () => {
		const cart = new CartApi()
		cart.setState(mockCartData)

		const app = initApp({
			cart,
			children: <Cart />,
		})

		const { container } = render(app)

		const table = await waitFor(() => container.querySelector('table'))

		expect(table).toBeTruthy()
	})

	it('should show products info and count sum', async () => {
		const cart = new CartApi()
		cart.setState(mockCartData)

		const app = initApp({
			cart,
			children: <Cart />,
		})

		const { container } = render(app)

		const tableItems = await waitFor(() =>
			container.querySelectorAll('tbody tr'),
		)

		const cartState = Object.values(cart.getState())

		expect(tableItems).toHaveLength(cartState.length)

		tableItems.forEach((item, index) => {
			const name = item.querySelector('.Cart-Name')!
			const price = item.querySelector('.Cart-Price')!
			const count = item.querySelector('Cart-Counter')!
			const total = item.querySelector('.Cart-Total')!

			waitFor(() => {
				expect(name.textContent).toEqual(cartState[index].name)
				expect(price.textContent).toEqual(`$${cartState[index].price}`)
				expect(count.textContent).toEqual(`${cartState[index].count}`)
				expect(total.textContent).toEqual(
					`$${cartState[index].price * cartState[index].count}`,
				)
			})
		})
	})

	it('should show amount of products in cart in header', async () => {
		const cart = new CartApi()
		cart.setState(mockCartData)

		const app = initApp({
			cart,
		})

		const { getByRole } = render(app)

		const cartLink = getByRole('link', { name: /cart/i })

		expect(Number(cartLink.textContent!.replace(/[^0-9.-]+/g, ''))).toEqual(
			Object.keys(mockCartData).length,
		)
	})
})
