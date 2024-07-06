import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Application } from './../../src/client/Application';
import { mockStore } from './mock';


describe('Header', () => {

    describe('Navbar', () => {
        const catalogHref = '/catalog';
        const deliveryHref = '/delivery';
        const contactHref = '/contacts';
        const cartHref = '/cart';

        let renderResult: RenderResult;
        beforeEach(() => {
            renderResult = render(
                <BrowserRouter>
                    <Provider store={mockStore}>
                        <Application />
                    </Provider>
                </BrowserRouter>
            );
        });


        it('Header содержит ссылку на страницу каталога.', () => {
            // Arrange
            const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
            const navbar = navbars[0];
            let linkToCatalogElement;

            // Act            
            if (navbar) {
                linkToCatalogElement = Array.from(navbar.getElementsByTagName('a'))
                    .find(linkElement => linkElement.href.includes(catalogHref));
            }

            // Assert
            expect(linkToCatalogElement).toBeInTheDocument();
        });

        it('При нажатии на ссылку на каталог приложение откроет страницу каталога', () => {
            // Arrange
            const navbar = renderResult.container.getElementsByClassName('navbar')[0];
            let linkToCatalogElement;
            if (navbar) {
                linkToCatalogElement = Array.from(navbar.getElementsByTagName('a'))
                    .find(linkElement => linkElement.href.includes(catalogHref));
            }

            // Act
            if (linkToCatalogElement) {
                console.log((linkToCatalogElement as HTMLAnchorElement).href);
                fireEvent.click(linkToCatalogElement);
            }

            // Assert
            expect(screen.getByRole('heading')).toHaveTextContent('Catalog');
        })

        it('Header содержит ссылку на страницу доставки.', () => {
            // Arrange
            const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
            const navbar = navbars[0];
            let linkToDeliveryElement;

            // Act            
            if (navbar) {
                linkToDeliveryElement = Array.from(navbar.getElementsByTagName('a'))
                    .find(linkElement => linkElement.href.includes(deliveryHref));
            }

            // Assert
            expect(linkToDeliveryElement).toBeInTheDocument();
        })

        it('Header содержит ссылку на страницу контактов.', () => {
            // Arrange
            const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
            const navbar = navbars[0];
            let linkToContactElement;

            // Act            
            if (navbar) {
                linkToContactElement = Array.from(navbar.getElementsByTagName('a'))
                    .find(linkElement => linkElement.href.includes(contactHref));
            }

            // Assert
            expect(linkToContactElement).toBeInTheDocument();
        })

        it('Header содержит ссылку на страницу корзины.', () => {
            // Arrange
            const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
            const navbar = navbars[0];
            let linkToCartElement;

            // Act            
            if (navbar) {
                linkToCartElement = Array.from(navbar.getElementsByTagName('a'))
                    .find(linkElement => linkElement.href.includes(cartHref));
            }

            // Assert
            expect(linkToCartElement).toBeInTheDocument();
        })

    });

    describe('Market Title', () => {
        const marketTitle = 'Kogtetochka store';
        const mainPageHref = '/';

        let renderResult: RenderResult;
        beforeAll(() => {
            renderResult = render(
                <BrowserRouter>
                    <Provider store={mockStore}>
                        <Application />
                    </Provider>
                </BrowserRouter>
            );
        });

        it('При нажатии на название магазина приложение переадресует пользователя на главную страницу.', () => {
            // Arrange
            const navbar = renderResult.container.getElementsByClassName('navbar')[0];
            let linkToMainPage;

            // Act
            if (navbar) {
                const links = Array.from(navbar.getElementsByTagName('a'));
                for (let link of links) {
                    if (link.href.includes(mainPageHref) && link.textContent === marketTitle) {
                        linkToMainPage = link;
                    }
                }
            }

            // Assert
            expect(linkToMainPage).toBeInTheDocument();
        })
    })
});