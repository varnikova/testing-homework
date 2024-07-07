import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../src/client/api";
import { Application } from "../src/client/Application";
import { initStore } from "../src/client/store";

export const createApplication = (basename = "/hw/store") => {
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );
};

export const renderApplication = () => {
  const application = createApplication();
  return render(application);
};
