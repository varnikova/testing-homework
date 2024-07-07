import { buildUrl } from "../helpers";

describe("Общие требования", () => {
  it("в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async ({
    browser,
  }) => {
    await browser.url(buildUrl("/"));
    const catalog = await browser.$(
      '.navbar-nav .nav-link[href="/hw/store/catalog"]',
    );
    expect(catalog).toBeDisplayed();

    const delivery = await browser.$(
      '.navbar-nav .nav-link[href="/hw/store/delivery"]',
    );
    expect(delivery).toBeDisplayed();

    const contacts = await browser.$(
      '.navbar-nav .nav-link[href="/hw/store/contacts"]',
    );
    expect(contacts).toBeDisplayed();

    const cart = await browser.$(
      '.navbar-nav .nav-link[href="/hw/store/cart"]',
    );
    expect(cart).toBeDisplayed();
  });

  it("название магазина в шапке должно быть ссылкой на главную страницу", async ({
    browser,
  }) => {
    await browser.url(buildUrl("/"));
    const title = await browser.$(".navbar-brand");
    expect(title).toHaveHrefContaining("/hw/store");
  });

  it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер', async ({
    browser,
  }) => {
    await browser.url(buildUrl("/"));
    await browser.setWindowSize(575, 800);
    const menu = await browser.$(".Application-Menu");
    expect(menu).not.toBeDisplayed();
  });
  it('при выборе элемента из меню "гамбургера", меню должно закрываться', async ({
    browser,
  }) => {
    await browser.url(buildUrl("/"));
    await browser.setWindowSize(575, 800);
    const burger = await browser.$(".Application-Toggler");
    await burger.click();
    await browser.$('.navbar-nav .nav-link[href="/hw/store/catalog"]').click();
    const menu = await browser.$(".Application-Menu");
    const classes = await menu.getAttribute("class");
    let isCollapsed = false;
    classes.split(" ").forEach((className) => {
      if (className === "collapse") {
        isCollapsed = true;
        return
      }
    });
    expect(isCollapsed).toBe(true);
  });
});
