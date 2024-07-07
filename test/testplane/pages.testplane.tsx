import { buildUrl } from "../helpers";

describe("Страницы:", () => {
  it("в магазине должны быть страницы: главная, каталог, условия доставки, контакты." +
      "// Страницы главная, условия доставки, контакты должны иметь статическое содержимое", async ({
    browser,
  }) => {
    await browser.url(buildUrl("/"));

    const title = await browser.$("p=Welcome to Kogtetochka store!");
    const isDisplayed = await title.isDisplayed();

    expect(isDisplayed).toBeTruthy();
    expect(title).toBeTruthy();

    await browser.url(buildUrl("/catalog"));
    const catalogTitle = await browser.$("h1=Catalog");
    const isCatalogTitleDisplayed = await catalogTitle.isDisplayed();
    expect(isCatalogTitleDisplayed).toBeTruthy();

    await browser.url(buildUrl("/delivery"));
    const deliveryTitle = await browser.$("h1=Delivery");
    const isDeliveryTitleDisplayed = await deliveryTitle.isDisplayed();
    expect(isDeliveryTitleDisplayed).toBeTruthy();

    await browser.url(buildUrl("/contacts"));
    const contactsTitle = await browser.$("h1=Contacts");
    const isContactsTitleDisplayed = await contactsTitle.isDisplayed();
    expect(isContactsTitleDisplayed).toBeTruthy();

    await browser.url(buildUrl("/cart"));
    const cartTitle = await browser.$("h1=Shopping cart");
    const isCartTitleDisplayed = await cartTitle.isDisplayed();
    expect(isCartTitleDisplayed).toBeTruthy();
  });
});
