import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Form } from '../components/Form';
import { checkout, clearCart } from '../store';
var bem = cn('Cart');
export var Cart = function () {
    var dispatch = useDispatch();
    var cart = useSelector(function (s) { return s.cart; });
    var latestOrderId = useSelector(function (s) { return s.latestOrderId; });
    var onClear = useCallback(function () {
        dispatch(clearCart());
    }, [dispatch]);
    var onSubmit = useCallback(function (form) {
        dispatch(checkout(form, cart));
    }, [dispatch, cart]);
    var content = null;
    var cartIsEmpty = !Object.keys(cart).length;
    if (!cartIsEmpty) {
        var rows = Object.entries(cart).map(function (_a, index) {
            var id = _a[0], item = _a[1];
            return (React.createElement("tr", { key: id, "data-testid": id },
                React.createElement("th", { className: bem('Index'), scope: "row" }, index + 1),
                React.createElement("td", { className: bem('Name') }, item.name),
                React.createElement("td", { className: bem('Price') },
                    "$",
                    item.price),
                React.createElement("td", { className: bem('Count') }, item.count),
                React.createElement("td", { className: bem('Total') },
                    "$",
                    item.count * item.price)));
        });
        var total = Object.values(cart).reduce(function (sum, _a) {
            var count = _a.count, price = _a.price;
            return sum + count * price;
        }, 0);
        content = (React.createElement("table", { className: bem('Table', ['table']) },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { scope: "col" }, "#"),
                    React.createElement("th", { scope: "col" }, "Product"),
                    React.createElement("th", { scope: "col" }, "Price"),
                    React.createElement("th", { scope: "col" }, "Count"),
                    React.createElement("th", { scope: "col" }, "Total"))),
            React.createElement("tbody", null, rows),
            React.createElement("tfoot", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: 4 }, "Order price:"),
                    React.createElement("td", { className: bem('OrderPrice') },
                        "$",
                        total)))));
    }
    else {
        content = (React.createElement(React.Fragment, null,
            "Cart is empty. Please select products in the ",
            React.createElement(Link, { to: "/catalog" }, "catalog"),
            "."));
    }
    var actions = cartIsEmpty ? null : (React.createElement("div", { className: "row mb-4" },
        React.createElement("div", { className: "col-6" },
            React.createElement("button", { className: bem('Clear', ['btn', 'btn-outline-secondary']), onClick: onClear }, "Clear shopping cart"))));
    var form = cartIsEmpty ? null : (React.createElement("div", { className: "row" },
        React.createElement("div", { className: "col-12 col-sm-8 col-md-6 col-lg-4" },
            React.createElement("h2", null, "\u0421heckout"),
            React.createElement(Form, { onSubmit: onSubmit }))));
    var alertClass = process.env.BUG_ID !== '8' ? 'alert-success' : 'alert-danger';
    var orderInfo = cartIsEmpty && latestOrderId ? (React.createElement("div", { className: "row my-2" },
        React.createElement("div", { className: "col-12 col-sm-8 col-md-6" },
            React.createElement("div", { className: bem('SuccessMessage', ['alert', alertClass]) },
                React.createElement("h4", { className: "alert-heading" }, "Well done!"),
                React.createElement("p", null,
                    "Order #",
                    React.createElement("strong", { className: bem('Number') }, latestOrderId),
                    " has been successfully completed."),
                React.createElement("hr", null),
                React.createElement("p", { className: "mb-0" }, "Please wait for confirmation of delivery."))))) : null;
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { title: "Shopping cart" }),
        React.createElement("div", { className: "row mb-4" },
            React.createElement("div", { className: "col" },
                React.createElement("h1", null, "Shopping cart"),
                orderInfo,
                content)),
        actions,
        form));
};
