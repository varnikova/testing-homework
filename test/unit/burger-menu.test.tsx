import { describe, it } from '@jest/globals'
import { initApp } from './helpers'
import { render, screen, waitFor } from '@testing-library/react'

import { userEvent } from '@testing-library/user-event'

describe('Burger Menu', () => {
	it('should show toggle when width < 576px', async () => {
		window.innerWidth = 575
		window.dispatchEvent(new Event('resize'))

		const app = initApp()
		render(app)

		const toggle = await screen.findByLabelText('Toggle navigation')

		expect(toggle).toBeTruthy()
	})

	it('should open menu when toggle is clicked', async () => {
		window.innerWidth = 575
		window.dispatchEvent(new Event('resize'))

		const app = initApp()
		const { container } = render(app)

		const toggle = await screen.findByLabelText('Toggle navigation')
		const menu = await container.querySelector('.Application-Menu')

		await userEvent.click(toggle)

		expect(menu?.classList.contains('collapse')).toBe(false)
	})

	it('should close menu when toggle is clicked twice', async () => {
		window.innerWidth = 575
		window.dispatchEvent(new Event('resize'))

		const app = initApp()
		const { container } = render(app)

		const toggle = await screen.findByLabelText('Toggle navigation')
		const menu = await container.querySelector('.Application-Menu')

		await userEvent.click(toggle)
		await userEvent.click(toggle)

		expect(menu?.classList.contains('collapse')).toBe(true)
	})

	it('should close menu when menu item is clicked', async () => {
		window.innerWidth = 575
		window.dispatchEvent(new Event('resize'))

		const app = initApp()
		const { container } = render(app)

		const toggle = await screen.findByLabelText('Toggle navigation')
		const menu = await container.querySelector('.Application-Menu')

		await userEvent.click(toggle)
		await userEvent.click(screen.getByText('Delivery'))

		await waitFor(() =>
			expect(menu?.classList.contains('collapse')).toBe(true),
		)
	})
})
