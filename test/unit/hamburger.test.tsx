import { fireEvent, render, RenderResult, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { Application } from "../../src/client/Application"
import { mockStore } from "./mock"
import React from "react"


describe('Responsive Menu', () => {
    const MIN_WIDTH = 567;

    let renderResult: RenderResult;
    beforeEach(() => {
        window.innerWidth = MIN_WIDTH - 1;
        window.dispatchEvent(new Event('resize'));

        renderResult = render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <Application />
                </Provider>
            </BrowserRouter>
        )
    });

    function getChildElement(parent: Element, classRegex: string | RegExp) {
        const regex = typeof classRegex === 'string' ? new RegExp(`${classRegex}`, 'i') : classRegex;

        const queue = Array.from(parent.children);
        while (queue.length > 0) {
            const current = queue.shift();
            if (current?.className.match(regex)) {
                return current;
            }
            queue.push(...Array.from(current?.children ?? []));
        }
    }

    test('Menu is not displayed on window width smaller than MIN_WIDTH', () => {
        // Arrange + Act
        const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
        const navbar = navbars[0];
        const menu = getChildElement(navbar, 'menu');

        // Assert
        expect(menu?.className?.split(' ')).toContain('collapse');
    });

    test('Menu is displayed on button click and window width smaller than MIN_WIDTH', () => {
        // Arrange
        const menuButton = screen.getByRole('button');

        // Act
        fireEvent.click(menuButton);

        // Arrange
        const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
        const navbar = navbars[0];
        const menu = getChildElement(navbar, 'menu');
        expect(menu?.className?.split(' ')).not.toContain('collapse');
    });

    test('Menu is hidden on button double click and window width smaller than MIN_WIDTH', () => {
        // Arrange
        const menuButton = screen.getByRole('button');

        // Act
        fireEvent.click(menuButton);
        fireEvent.click(menuButton);

        // Arrange
        const navbars = Array.from(renderResult.container.getElementsByClassName('navbar'));
        const navbar = navbars[0];
        const menu = getChildElement(navbar, 'menu');
        expect(menu?.className?.split(' ')).toContain('collapse');
    });
})