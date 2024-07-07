import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { addToCart } from '../store';
import { CartBadge } from './CartBadge';
import { Image } from './Image';
var bem = cn('ProductDetails');
export var ProductDetails = function (_a) {
    var product = _a.product;
    var dispatch = useDispatch();
    var onClick = useCallback(function () {
        dispatch(addToCart(product));
    }, [dispatch, product]);
    var btnSizeClass = process.env.BUG_ID !== '9' ? 'btn-lg' : 'btn-sm';
    return (React.createElement("div", { className: bem(null, ['row']) },
        React.createElement("div", { className: "col-12 col-sm-5 col-lg-4" },
            React.createElement(Image, null)),
        React.createElement("div", { className: "col-12 col-sm-7 col-lg-6" },
            React.createElement("h1", { className: bem("Name") }, product.name),
            React.createElement("p", { className: bem("Description") }, product.description),
            React.createElement("p", { className: bem("Price", ['fs-3']) },
                "$",
                product.price),
            React.createElement("p", null,
                React.createElement("button", { className: bem("AddToCart", ['btn', 'btn-primary', btnSizeClass]), onClick: onClick }, "Add to Cart"),
                React.createElement(CartBadge, { id: product.id })),
            React.createElement("dl", null,
                React.createElement("dt", null, "Color"),
                React.createElement("dd", { className: bem("Color", ['text-capitalize']) }, product.color),
                React.createElement("dt", null, "Material"),
                React.createElement("dd", { className: bem("Material", ['text-capitalize']) }, product.material)))));
};
