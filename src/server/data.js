var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Faker, en } from '@faker-js/faker';
export var faker = new Faker({
    locale: [en],
});
var commerce = faker.commerce;
var cats = faker.animal;
var generateProducts = function () {
    var products = [];
    for (var id = 0; id < 27; id++) {
        products.push({
            id: id,
            name: "".concat(commerce.productAdjective(), " kogtetochka"),
            description: "Really ".concat(commerce.productAdjective(), " kogtetochka for ").concat(cats.cat()),
            price: Number(commerce.price()),
            color: faker.color.human(),
            material: commerce.productMaterial(),
        });
    }
    return products;
};
function getShortInfo(_a) {
    var id = _a.id, name = _a.name, price = _a.price;
    return { id: id, name: name, price: price };
}
export var SIZE = 200;
var ExampleStore = /** @class */ (function () {
    function ExampleStore() {
        this.products = generateProducts();
        this.orders = [];
    }
    ExampleStore.prototype.getAllProducts = function (bugId) {
        var products = this.products.map(getShortInfo);
        if (bugId === 1) {
            products.forEach(function (p) { p.name = undefined; });
        }
        return products;
    };
    ExampleStore.prototype.getProductById = function (id) {
        var product = this.products.filter(function (p) { return p.id === id; })[0];
        return product;
    };
    ExampleStore.prototype.createOrder = function (order) {
        var id = this.orders.length + 1;
        this.orders.push(__assign({ id: id }, order));
        return id;
    };
    ExampleStore.prototype.getLatestOrders = function () {
        return this.orders.slice(-SIZE);
    };
    return ExampleStore;
}());
export { ExampleStore };
