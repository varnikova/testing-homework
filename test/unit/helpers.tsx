import { CartApi, ExampleApi } from '../../src/client/api'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Application } from '../../src/client/Application'
import React, { ReactNode } from 'react'
import { initStore } from '../../src/client/store'
import { BASENAME } from '../index'

interface initAppOptions {
	api?: ExampleApi
	cart?: CartApi
	initialEntries?: string[]
	initialIndex?: number
	children?: ReactNode
}

export function initApp(args?: initAppOptions) {
	const {
		api: apiFromArgs,
		cart: cartFromArgs,
		initialEntries: initialEntriesFromArgs,
		initialIndex: initialIndexFromArgs,
		children = <Application />,
	} = args ?? {}

	const api = apiFromArgs ?? new ExampleApi(BASENAME)
	const cart = cartFromArgs ?? new CartApi()

	const store = initStore(api, cart)

	return (
		<MemoryRouter
			basename={BASENAME}
			initialEntries={initialEntriesFromArgs ?? [`${BASENAME}/`]}
			initialIndex={initialIndexFromArgs ?? 0}
		>
			<Provider store={store}>{children}</Provider>
		</MemoryRouter>
	)
}
