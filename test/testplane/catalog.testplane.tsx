import { ExampleApi } from "../../src/client/api";
import { buildUrl } from "../helpers";
import { URL } from "./constants";

const api = new ExampleApi(URL);

afterEach(async ({ browser }) => {
  await browser.execute(() => {
    localStorage.clear();
  });
});

describe("Каталог:", function () {
  it("в каталоге должны отображаться товары, список которых приходит с сервера", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();

    await browser.url(buildUrl("/catalog"));

    const parsedItems = await browser.$$(".ProductItem").map((item) => item);

    const items = await Promise.all(
      parsedItems.map(async (item) => {
        const href = await item
          .$(".ProductItem-DetailsLink")
          .getAttribute("href");
        const match = href.match(/\/(\d+)$/);
        const productId = match ? match[1] : null;
        const name = await item.$(".ProductItem-Name");
        const price = await item.$(".ProductItem-Price");

        return {
          id: parseInt(productId),
          name: await name.getText(),
          price: parseInt((await price.getText()).replace(/[^0-9.]/g, "")),
        };
      }),
    );

    expect(items).toEqual(data);
  });

  it("для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async ({
    browser,
  }) => {
    await browser.url(buildUrl("/catalog"));

    const parsedItems = await browser.$$(".ProductItem").map((item) => item);

    await Promise.all(
      parsedItems.map(async (item) => {
        const href = await item
          .$(".ProductItem-DetailsLink")
          .getAttribute("href");
        const name = await item.$(".ProductItem-Name").getText();
        const price = await item.$(".ProductItem-Price").getText();
        expect(href).toBeTruthy();
        expect(name).toBeTruthy();
        expect(price).toBeTruthy();
      }),
    );
  });

  it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async ({
    browser,
  }) => {
    const { data } = await api.getProducts();
    const product = data[1];

    const { data: testProduct } = await api.getProductById(product.id);
    await browser.url(buildUrl(`/catalog/${testProduct.id}`));

    const name = await browser.$(".ProductDetails-Name").getText();
    const description = await browser
      .$(".ProductDetails-Description")
      .getText();
    const price = (await browser.$(".ProductDetails-Price").getText()).replace(
      /[^0-9.]/g,
      "",
    );
    const color = await browser.$(".ProductDetails-Color").getText();
    const material = await browser.$(".ProductDetails-Material").getText();
    const button = await browser.$(".ProductDetails-AddToCart");

    expect(product.id).toEqual(testProduct.id);
    expect(name.toLowerCase()).toEqual(testProduct.name.toLowerCase());
    expect(description.toLowerCase()).toEqual(
      testProduct.description.toLowerCase(),
    );
    expect(parseInt(price)).toEqual(testProduct.price);
    expect(color.toLowerCase()).toEqual(testProduct.color.toLowerCase());
    expect(material.toLowerCase()).toEqual(testProduct.material.toLowerCase());
    expect(button).toBeDisplayed();
  });

  it('кнопка доавбить в корзину должна быть заметной(минимум 40 пикселей в высоту и ширину) ', async ({
                                                                                                                                                     browser,
                                                                                                                                                   }) => {
    const { data } = await api.getProducts();
    const product = data[1];

    const { data: testProduct } = await api.getProductById(product.id);
    await browser.url(buildUrl(`/catalog/${testProduct.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");

    const height = await button.getCSSProperty('height');
    const width = await button.getCSSProperty('width');
    const isBig = parseInt(width.value) >= 40 && parseInt(height.value) >= 40;
    expect(isBig).toEqual(true);
  });

  it("если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();
    const product = data[0];

    const { data: testProduct } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${testProduct.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");
    button.click();
    const itemBadge = await browser.$(".CartBadge").getText();

    expect(itemBadge).toEqual("Item in cart");

    await browser.url(buildUrl("/catalog"));

    const item = await browser.$(`[data-testid="${testProduct.id}"]`);
    const catalogBadge = await item.$(".CartBadge").getText();

    expect(catalogBadge).toEqual("Item in cart");
  });

  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async ({
    browser,
  }) => {
    const { data } = await api.getProducts();
    const product = data[0];

    const { data: testProduct } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${testProduct.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");

    await button.click();
    await button.click();

    await browser.url(buildUrl("/cart"));

    const item = await browser.$(`[data-testid="${testProduct.id}"]`);
    const count = await item.$(".Cart-Count").getText();

    expect(parseInt(count, 10)).toEqual(2);
  });

  it("содержимое корзины должно сохраняться между перезагрузками страницы", async ({
    browser,
  }) => {
    const { data } = await api.getProducts();
    const product = data[0];

    const { data: testProduct } = await api.getProductById(product.id);

    await browser.url(buildUrl(`/catalog/${testProduct.id}`));

    const button = await browser.$(".ProductDetails-AddToCart");
    await button.click();

    await browser.url(buildUrl("/cart"));

    const table = await browser.$(".Cart-Table");
    const tableRowsCount = await table.$$(".Cart-Name").length;

    await browser.refresh();

    const tableAfterRefresh = await browser.$(".Cart-Table");
    const tableRowsCountAfterRefresh = await tableAfterRefresh.$$(".Cart-Name").length;

    expect(tableRowsCount).toEqual(tableRowsCountAfterRefresh);
  });
});
