import React from 'react'

import { it, expect } from '@jest/globals'
import { render } from '@testing-library/react'
import { Home } from '../../src/client/pages/Home'
import { Delivery } from '../../src/client/pages/Delivery'
import { Contacts } from '../../src/client/pages/Contacts'

describe('Website pages', function () {
	it('home, delivery and contacts should have static content', () => {
		const renderHomePage = render(<Home />)
		const renderDeliveryPage = render(<Delivery />)
		const renderContactsPage = render(<Contacts />)

		expect(renderHomePage.container.outerHTML).toMatchSnapshot()
		expect(renderDeliveryPage.container.outerHTML).toMatchSnapshot()
		expect(renderContactsPage.container.outerHTML).toMatchSnapshot()
	})
})
