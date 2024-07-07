import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { CartBadge } from './CartBadge';
import { Image } from './Image';
var bem = cn('ProductItem');
export var ProductItem = function (_a) {
    var product = _a.product;
    return (React.createElement("div", { "data-testid": product.id, className: bem(null, ['card', 'w-100', 'mb-4']) },
        React.createElement(Image, { className: "card-img-top" }),
        React.createElement("div", { className: "card-body" },
            React.createElement("h5", { className: bem('Name', ['card-title']) }, product.name),
            React.createElement("p", { className: bem('Price', ['card-text']) },
                "$",
                product.price),
            React.createElement(Link, { to: "/catalog/".concat(product.id), className: bem('DetailsLink', ['card-link']) }, "Details"),
            React.createElement(CartBadge, { id: product.id }))));
};
