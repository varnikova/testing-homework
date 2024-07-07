import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { mockProducts, mockStore } from "./mock";
import React from "react";
import { CartItem } from "../../src/common/types";
import { Application } from "./../../src/client/Application";
import { Cart } from "../../src/client/pages/Cart";
import '@testing-library/jest-dom';


describe('Cart', () => {

    describe("Добавление продуктов в корзину", () => {
        const product = mockProducts[0];

        let renderResult: RenderResult;
        beforeEach(() => {
            renderResult = render(
                <MemoryRouter>
                    <Provider store={mockStore}>
                        <ProductDetails product={product} />
                    </Provider>
                </MemoryRouter>
            )
        });

        test('Повторное нажатие кнопки "добавить в корзину" должно увеличивать количество товара', () => {
            // Arrange
            const button = screen.getByRole('button');
            const timesToClick = 3;

            // Act
            for (let i = 0; i < timesToClick; ++i) {
                fireEvent.click(button);
            }

            const productsInCart = new Array<CartItem>();
            Object.entries(mockStore.getState().cart).forEach((value) => {
                const [id, item] = value;
                if (id === String(product.id)) {
                    productsInCart.push(item);
                }
            })


            // Assert
            expect(productsInCart.length).toBe(1);
            expect(productsInCart[0].count).toBe(timesToClick);
        });

    });

    describe('Отображение состояние корзины в шапке', () => {
        const cartHref = '/cart';

        let renderResult: RenderResult;
        beforeEach(() => {
            renderResult = render(
                <MemoryRouter>
                    <Provider store={mockStore}>
                        <Application />
                    </Provider>
                </MemoryRouter>
            )
        });

        test('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
            // Arrange
            const productsToCart = [mockProducts[0], mockProducts[1]];
            const countToAdd = [2, 3];

            for (let i = 0; i < productsToCart.length; ++i) {
                for (let j = 0; j < countToAdd[i]; ++j) {
                    mockStore.dispatch({ type: 'ADD_TO_CART', product: productsToCart[i] });
                }
            }

            // Act
            const cartLink = Array.from(await screen.findAllByRole('link')).find(link => (link as HTMLAnchorElement).href.includes(cartHref));
            const productNumber = cartLink?.innerHTML?.match(/\d+/)?.[0];

            // Assert
            expect(productNumber).toBe(String(productsToCart.length));
        })
    });

    describe("Страница корзины", () => {
        let renderResult: RenderResult;
        beforeEach(() => {
            renderResult = render(
                <MemoryRouter>
                    <Provider store={mockStore}>
                        <Cart />
                    </Provider>
                </MemoryRouter>
            )
        });

        test('Для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа', async () => {
            // Arrange
            if (Object.entries(mockStore.getState().cart).length > 0) {
                const button = await screen.findByText('Clear shopping cart');
                fireEvent.click(button);
            }
            const productToCart = mockProducts[0];
            const countToAdd = 2;
            let total = 0;

            for (let j = 0; j < countToAdd; ++j) {
                mockStore.dispatch({ type: 'ADD_TO_CART', product: productToCart });
                total += productToCart.price;
            }

            // Act
            const productRow = await screen.findByTestId(productToCart.id);
            const cart = mockStore.getState().cart;
            console.log(productRow.innerHTML);
            const nameElement = productRow.innerHTML.match(new RegExp(productToCart.name, 'i'));
            const priceElement = productRow.innerHTML.match(new RegExp(String(productToCart.price), 'i'));
            const countElement = productRow.innerHTML.match(new RegExp(`${cart[productToCart.id].count}`, 'i'));
            const totalProductElement = productRow.innerHTML.match(new RegExp(`${total}`, 'i'));
            const orderTotal = Array.from(renderResult.container.getElementsByTagName('tfoot'))[0].innerHTML.match(`${total}`);

            screen.debug();

            // Assert
            expect(nameElement).not.toBeNull();
            expect(priceElement).not.toBeNull();
            expect(countElement).not.toBeNull();
            expect(totalProductElement).not.toBeNull();
            expect(orderTotal).not.toBeNull();
        })

        test('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
            // Arrange
            const productsToCart = [mockProducts[0], mockProducts[1]];
            const countToAdd = [2, 3];

            for (let i = 0; i < productsToCart.length; ++i) {
                for (let j = 0; j < countToAdd[i]; ++j) {
                    mockStore.dispatch({ type: 'ADD_TO_CART', product: productsToCart[i] });
                }
            }

            // Act
            const button = await screen.findByText('Clear shopping cart');
            fireEvent.click(button);

            // Assert
            expect(Object.entries(mockStore.getState().cart).length).toBe(0);
        })

        test('При отсутствии товаров в корзине должна отображаться ссылка на страницу каталога', async () => {
            // Act
            const link = Array.from(await screen.findAllByRole('link')).find(link => (link as HTMLAnchorElement).href.includes('/catalog'));

            // Assert
            expect(link).toBeInTheDocument();
        })
    })

})