import React from 'react'
import { initApp } from './helpers'
import { ProductDetails } from '../../src/client/components/ProductDetails'
import { render, screen } from '@testing-library/react'
import { it } from '@jest/globals'
import { Product } from '../../src/common/types'

describe('Product Details Page', () => {
	it('should show name, description, price, color and material of the product ', async () => {
		const product: Product = {
			id: 1,
			name: 'Test Product',
			description: 'TestDescription',
			price: 10,
			color: 'TestColor',
			material: 'TestMaterial',
		}

		const app = initApp({
			children: <ProductDetails product={product} />,
		})

		render(app)

		const name = await screen.findByText(product.name)
		const description = await screen.findByText(product.description)
		const price = await screen.findByText(`$${product.price}`)
		const color = await screen.findByText(product.color)
		const material = await screen.findByText(product.material)

		expect(name).not.toBeNull()
		expect(description).not.toBeNull()
		expect(price).not.toBeNull()
		expect(color).not.toBeNull()
		expect(material).not.toBeNull()
	})
})
