import { it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { renderApplication } from "../app";

it("название магазина в шапке должно быть ссылкой на главную страницу", async () => {
  const { getByText } = renderApplication();

  const a = getByText(/Kogtetochka store/i, {
    selector: ".Application-Brand.navbar-brand",
  });

  expect(a).toHaveAttribute("href", "/");
});
