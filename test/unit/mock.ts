import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../../src/common/types";


export const mockProducts: Product[] = [
    { id: 1, name: 'Кукурузные палочки Кузя', price: 150, description: '', material: "", color: '' },
    { id: 2, name: 'Булочка с корицей', price: 250, description: '', material: "", color: '' },
    { id: 3, name: 'Фикус от Саши Давней', price: 12250, description: '', material: "", color: '' },
    { id: 4, name: 'Yandex Rover, игрушка', price: 1879, description: '', material: "", color: '' },
    { id: 5, name: 'Открытка "Хочу спать, очень очень хочу"', price: 10, description: '', material: "", color: '' },
]

const mockedApi = jest.fn().mockImplementation(() => {
    return {
        getProducts: () => {
            return Promise.resolve({ data: mockProducts as ProductShortInfo[] });
            //return await axios.get<ProductShortInfo[]>(`${this.basename}/api/products`, { params: { bug_id: currentBugId } });
        },

        getProductById: (id: number) => {
            return Promise.resolve({ data: mockProducts[id] });
            //return await axios.get<Product>(`${this.basename}/api/products/${id}`, { params: { bug_id: currentBugId } });
        },

        checkout: (form: CheckoutFormData, cart: CartState) => {

            //return await axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart }, { params: { bug_id: currentBugId } });
        }
    } as jest.Mocked<ExampleApi>
});

const mockApi = mockedApi();
const cartApi = new CartApi();

export const mockStore = initStore(mockApi, cartApi);

