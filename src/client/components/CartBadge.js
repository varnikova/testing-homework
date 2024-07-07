import React from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';
var bem = cn('CartBadge');
export var CartBadge = function (_a) {
    var id = _a.id;
    var cart = useSelector(function (s) { return s.cart; });
    return cart[id] ? React.createElement("span", { className: bem(null, ['text-success', 'mx-3']) }, "Item in cart") : null;
};
