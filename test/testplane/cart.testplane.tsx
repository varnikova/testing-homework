import { ExampleApi } from "../../src/client/api";
import { URL } from "./constants";
import { buildUrl } from "../helpers";

const api = new ExampleApi(URL);

afterEach(async ({ browser }) => {
  await browser.execute(() => {
    localStorage.clear();
  });
});

describe("Корзина:", function () {
  it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();

    const product = data[0];

    const { data: productById } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${productById.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");
    await button.click();
    await button.click();

    const text = await browser
      .$('.navbar-nav .nav-link[href="/hw/store/cart"]')
      .getText();

    expect(text).toEqual("Cart (1)");
  });

  it("в корзине должна отображаться таблица с добавленными в нее товарами", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();

    const product = data[0];

    const { data: productById } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${productById.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");

    await button.click();

    await browser.url(buildUrl("/cart"));

    const table = await browser.$(".Cart-Table");
    const tableRowsCount = await table.$$(".Cart-Name").length;

    expect(table).toBeDisplayed();
    expect(tableRowsCount).toEqual(1);
  });

  it("для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();

    const product = data[0];

    const { data: productById } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${productById.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");

    await button.click();
    await button.click();

    await browser.url(buildUrl("/cart"));
    const table = await browser.$(".Cart-Table");

    const name = await table.$(".Cart-Name").getText();
    const price = await table.$(".Cart-Price").getText();
    const count = await table.$(".Cart-Count").getText();
    const total = await browser.$(".Cart-OrderPrice").getText();

    expect(name).toEqual(productById.name);
    expect(price).toEqual(`$${productById.price}`);
    expect(count).toEqual(`2`);
    expect(total).toEqual(`$${2 * productById.price}`);
  });

  it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async ({
    browser,
  }) => {
    const { data } = await api.getProducts();

    const product = data[0];

    const { data: productById } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${productById.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");
    await button.click();
    await button.click();

    await browser.url(buildUrl(`/cart`));

    const clearButton = await browser.$(".Cart-Clear");
    await clearButton.click();

    const table = await browser.$(".Cart-Table");

    expect(table).not.toBePresent();
  });

  it("если корзина пустая, должна отображаться ссылка на каталог товаров", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();

    const product = data[0];

    const { data: productById } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${productById.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");
    await button.click();
    await button.click();

    await browser.url(buildUrl(`/cart`));

    const clearButton = await browser.$(".Cart-Clear");
    await clearButton.click();

    const cart = await browser.$(".Cart");
    const link = await cart.$("a");
    const href = await link.getAttribute("href");

    expect(href).toContain("/catalog");
  });

  it("можем сделать заказ и получить успешный ответ", async ({
                                                                                    browser,
                                                                                  }) => {
    const { data } = await api.getProducts();

    const product = data[0];

    const { data: productById } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${productById.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");
    await button.click();

    await browser.url(buildUrl(`/cart`));

    const nameInput = await browser.$("#f-name");
    await nameInput.setValue("Daria");
    const phoneInput = await browser.$("#f-phone");
    await phoneInput.setValue("8888888888");
    const addressInput = await browser.$("#f-address");
    await addressInput.setValue("saint-petersburg 52");
    const formButton = await browser.$(".Form-Submit");
    await formButton.click();
    const success = await browser.$(".alert-success");
    await success.waitForExist({ timeout: 6000, timeoutMsg: "fail" });
    const isDisplayed = await success.isDisplayed();
    expect(isDisplayed).toBe(true);
    const cartNumber = await browser.$(".Cart-Number").getText();
    expect(cartNumber).toBe("1");
  });
});
