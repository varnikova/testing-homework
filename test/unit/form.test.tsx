import { findByText, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Cart } from "../../src/client/pages/Cart";
import { mockProducts, mockStore } from "./mock";
import React from "react";
import "@testing-library/jest-dom";


describe('Checkout Form', () => {

    let renderResult: RenderResult;
    beforeEach(() => {
        renderResult = render(
            <MemoryRouter>
                <Provider store={mockStore}>
                    <Cart />
                </Provider>
            </MemoryRouter>
        )
        mockStore.dispatch({ type: 'ADD_TO_CART', product: mockProducts[0] })
    });

    test("После ввода всей корректной информации и отправки формы все данные должны пропасть.", async () => {
        // Arrange
        const name = "Луффи";
        const phone = '9999999999';
        const address = "Grand Line";

        const nameInput = await screen.findByLabelText('Name');
        const phoneInput = await screen.findByLabelText('Phone');
        const addressInput = await screen.findByLabelText('Address');

        // Act
        fireEvent.input(nameInput, {
            target: { value: name }
        });
        fireEvent.input(phoneInput, {
            target: { value: phone }
        });
        fireEvent.input(addressInput, {
            target: { value: address }
        });

        const button = await screen.findByText('Checkout') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        screen.debug();

        // Assert
        expect(await screen.findByText('Cart is empty')).toBeInTheDocument();
    })
})