import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const mockApi = new ExampleApi('/hw/store');
const cartApi = new CartApi();

export const mockStore = initStore(mockApi, cartApi);