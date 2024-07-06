

describe('Адаптация верстки под ширину экрана.', () => {

    describe('Адаптация header под ширину экрана.', () => {

        it('Header содержит navbar при ширине >= 576px.', async ({ browser }) => {
            // Arrange
            //await browser.url('http://localhost:3000/hw/store/');

            // Act
            //renderResult

            // Assert
        })

        it('Header содержит кнопку с burger menu при ширине меньше 576px', async ({ browser }) => {
            // Arrange
            await browser.url('http://localhost:3000/hw/store/');

            // Act
            await browser.$('')

            // Assert
        })

        it('При нажатии на кнопку burger menu появляется меню.', () => {

        })

        it('При нажатии на кнопку burger menu и при открытом меню, меню закрыывается.', () => {

        })

        it('При выборе элемента из меню, burger menu должно закрываться', () => {

        })

    });
});