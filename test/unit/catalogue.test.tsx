import { render, RenderResult, screen } from "@testing-library/react";
import React, { act } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockProducts, mockStore } from "./mock";
import { Catalog } from "../../src/client/pages/Catalog";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import '@testing-library/jest-dom';


describe('Catalog', () => {
    const productHref = (id: string | number) => `/catalog/${id}`;
    const productInCartText = 'Item in cart';

    describe('List of products', () => {
        let renderResult: RenderResult;
        beforeEach(() => {
            renderResult = render(
                <BrowserRouter>
                    <Provider store={mockStore}>
                        <Catalog />
                    </Provider>
                </BrowserRouter>
            )
        })

        test('Каталог должен отобразить список товаров, которые пришли с сервера', async () => {
            // Arrange
            const promises = Promise.all(
                mockProducts.map(product => {
                    const regExp = new RegExp(`${product.name}`, 'i');
                    return screen.findByText((content) => !!content.match(regExp));
                })
            );
            // Act
            const products = await promises;

            // Assert
            expect(products.length).toBe(mockProducts.length);
        });

        test('Карточка товара должна содержать название, цену товара и ссылку на страницу с подробной информацикй о товаре', async () => {
            // Arrange
            const randomProductId = Number(Math.random().toFixed(3).at(-1)) % mockProducts.length;
            const nameRegExp = new RegExp(`${mockProducts[randomProductId].name}`, 'i');
            const priceRegExp = new RegExp(`${mockProducts[randomProductId].price}`, 'i');

            // Act
            const product = (await screen.findAllByTestId(randomProductId + 1))[0];
            const link = Array.from(product.getElementsByTagName('a')).find(link => link.href.includes(productHref(randomProductId + 1)));

            // Assert
            expect(product).toBeInTheDocument();
            expect(product.innerHTML).toMatch(nameRegExp);
            expect(product.innerHTML).toMatch(priceRegExp);
            expect(link).toBeInTheDocument();
        });

        test('Карточка товара должна информировать пользователя о том, что товар находится в корзине', async () => {
            // Arrange
            const product = mockProducts[0]
            mockStore.dispatch({ type: 'ADD_TO_CART', product });

            // Act
            const productElement = Array.from(await screen.findAllByTestId(product.id))[0];

            // Assert
            expect(productElement).toHaveTextContent(productInCartText);
        });
    });

    describe('Product Page', () => {
        const product = mockProducts[0];

        let renderResult: RenderResult;
        beforeEach(() => {
            renderResult = render(
                <BrowserRouter>
                    <Provider store={mockStore}>
                        <ProductDetails product={product} />
                    </Provider>
                </BrowserRouter>
            )
        });

        test('На странице с подробной информацией должны отображаться: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
            // Arrange

            // Act
            const name = Array.from(screen.getAllByText(product.name))[0];
            const description = Array.from(screen.getAllByText(product.description))[0];
            const price = Array.from(screen.getAllByText((content, element) => content.includes(String(product.price))))[0];
            const color = Array.from(screen.getAllByText(product.color))[0];
            const material = Array.from(screen.getAllByText(product.material))[0];
            const button = Array.from(screen.getAllByRole('button'))[0];

            // Assert
            expect(name).toBeInTheDocument();
            expect(description).toBeInTheDocument();
            expect(price).toBeInTheDocument();
            expect(color).toBeInTheDocument();
            expect(material).toBeInTheDocument();

            expect(button.outerHTML).toMatch(/add to cart/i)
        });

        test('Страница товара должна информировать пользователя о том, что товар есть в корзине', async () => {
            // Arrange
            const product = mockProducts[0]
            mockStore.dispatch({ type: 'ADD_TO_CART', product });

            // Act
            const productInCartElement = await screen.findByText(productInCartText);

            // Assert
            expect(productInCartElement).toBeInTheDocument();
        })
    })

});