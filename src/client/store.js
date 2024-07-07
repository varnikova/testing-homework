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
import { createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware, ofType } from 'redux-observable';
import { EMPTY, from, map, mergeMap, mergeMapTo, tap } from 'rxjs';
import { produce } from 'immer';
var DEFAULT_STATE = { details: {}, cart: {} };
// actions
export var productsLoad = function () { return ({ type: 'PRODUCTS_LOAD' }); };
export var productsLoaded = function (products) { return ({ type: 'PRODUCTS_LOADED', products: products }); };
export var productDetailsLoad = function (id) { return ({ type: 'PRODUCT_DETAILS_LOAD', id: id }); };
export var productDetailsLoaded = function (details) { return ({ type: 'PRODUCT_DETAILS_LOADED', details: details }); };
export var addToCart = function (product) { return ({ type: 'ADD_TO_CART', product: product }); };
export var clearCart = function () { return ({ type: 'CLEAR_CART' }); };
export var checkout = function (form, cart) { return ({ type: 'CHECKOUT', form: form, cart: cart }); };
export var checkoutComplete = function (orderId) { return ({ type: 'CHECKOUT_COMPLETE', orderId: orderId }); };
// reducer
function createRootReducer(state) {
    var defaultState = __assign(__assign({}, DEFAULT_STATE), state);
    var fn = function (state, action) {
        if (state === void 0) { state = defaultState; }
        return produce(state, function (draft) {
            switch (action.type) {
                case 'PRODUCTS_LOAD':
                    draft.products = undefined;
                    break;
                case 'PRODUCTS_LOADED':
                    draft.products = action.products;
                    break;
                case 'PRODUCT_DETAILS_LOADED': {
                    draft.details[action.details.id] = action.details;
                    break;
                }
                case 'ADD_TO_CART':
                    var _a = action.product, id = _a.id, name_1 = _a.name, price = _a.price;
                    if (process.env.BUG_ID !== '7') {
                        if (!draft.cart[id]) {
                            draft.cart[id] = { name: name_1, count: 0, price: price };
                        }
                        draft.cart[id].count++;
                    }
                    draft.latestOrderId = undefined;
                    break;
                case 'CLEAR_CART':
                    draft.cart = {};
                    draft.latestOrderId = undefined;
                    break;
                case 'CHECKOUT_COMPLETE':
                    draft.latestOrderId = action.orderId;
                    draft.cart = {};
                    break;
            }
        });
    };
    return fn;
}
// epics
var productsLoadEpic = function (action$, store$, _a) {
    var api = _a.api;
    return action$.pipe(ofType('PRODUCTS_LOAD'), mergeMap(function (a) {
        return from(api.getProducts()).pipe(map(function (products) { return productsLoaded(products.data); }));
    }));
};
var productDetailsLoadEpic = function (action$, store$, _a) {
    var api = _a.api;
    return action$.pipe(ofType('PRODUCT_DETAILS_LOAD'), mergeMap(function (a) {
        return from(api.getProductById(a.id)).pipe(map(function (products) { return productDetailsLoaded(products.data); }));
    }));
};
var shoppingCartEpic = function (action$, store$, _a) {
    var cart = _a.cart;
    return action$.pipe(ofType('ADD_TO_CART', 'CLEAR_CART', 'CHECKOUT_COMPLETE'), tap(function () {
        if (process.env.BUG_ID !== '6') {
            cart.setState(store$.value.cart);
        }
    }), mergeMapTo(EMPTY));
};
var checkoutEpic = function (action$, store$, _a) {
    var api = _a.api;
    return action$.pipe(ofType('CHECKOUT'), mergeMap(function (_a) {
        var form = _a.form, cart = _a.cart;
        if (process.env.BUG_ID === '5') {
            return EMPTY;
        }
        return from(api.checkout(form, cart)).pipe(map(function (res) { return checkoutComplete(res.data.id); }));
    }));
};
export var rootEpic = combineEpics(checkoutEpic, shoppingCartEpic, productsLoadEpic, productDetailsLoadEpic);
export function initStore(api, cart) {
    var rootReducer = createRootReducer({
        cart: cart.getState()
    });
    var epicMiddleware = createEpicMiddleware({
        dependencies: { api: api, cart: cart }
    });
    var store = createStore(rootReducer, applyMiddleware(epicMiddleware));
    epicMiddleware.run(rootEpic);
    return store;
}
