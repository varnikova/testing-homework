import React, { useCallback, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Delivery } from './pages/Delivery';
import { Contacts } from './pages/Contacts';
import { Helmet } from 'react-helmet';
import { Cart } from './pages/Cart';
import { useSelector } from 'react-redux';
var bem = cn('Application');
export var Application = function () {
    var _a = useState(true), collapsed = _a[0], setCollapsed = _a[1];
    var cart = useSelector(function (s) { return s.cart; });
    var toggle = useCallback(function () { return setCollapsed(!collapsed); }, [setCollapsed, collapsed]);
    var hide = useCallback(function () {
        if (process.env.BUG_ID === '4') {
            setCollapsed(false);
        }
        else {
            setCollapsed(true);
        }
    }, [setCollapsed]);
    var count = Object.keys(cart).length;
    var cartLabel = count ? "Cart (".concat(count, ")") : 'Cart';
    var navbarClass = collapsed ? 'collapse navbar-collapse' : 'navbar-collapse';
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { titleTemplate: '%s \u2014 Kogtetochka store' }),
        React.createElement("nav", { className: 'navbar navbar-expand-sm navbar-light bg-light' },
            React.createElement("div", { className: 'container' },
                React.createElement(Link, { className: bem('Brand', ['navbar-brand']), to: '/' }, "Kogtetochka store"),
                React.createElement("button", { className: bem('Toggler', ['navbar-toggler']), "aria-label": 'Toggle navigation', onClick: toggle },
                    React.createElement("span", { className: 'navbar-toggler-icon' })),
                React.createElement("div", { className: bem('Menu', [navbarClass]) },
                    React.createElement("div", { className: 'navbar-nav' },
                        React.createElement(NavLink, { className: function (_a) {
                                var isActive = _a.isActive;
                                return (isActive ? 'active nav-link' : 'nav-link');
                            }, to: '/catalog', onClick: hide }, "Catalog"),
                        React.createElement(NavLink, { className: function (_a) {
                                var isActive = _a.isActive;
                                return (isActive ? 'active nav-link' : 'nav-link');
                            }, to: '/delivery', onClick: hide }, "Delivery"),
                        React.createElement(NavLink, { className: function (_a) {
                                var isActive = _a.isActive;
                                return (isActive ? 'active nav-link' : 'nav-link');
                            }, to: '/contacts', onClick: hide }, "Contacts"),
                        React.createElement(NavLink, { className: function (_a) {
                                var isActive = _a.isActive;
                                return (isActive ? 'active nav-link' : 'nav-link');
                            }, to: '/cart', onClick: hide }, cartLabel))))),
        React.createElement("div", { className: 'container pt-4' },
            React.createElement(Routes, null,
                React.createElement(Route, { path: '/', element: React.createElement(Home, null) }),
                React.createElement(Route, { path: '/catalog', element: React.createElement(Catalog, null) }),
                React.createElement(Route, { path: '/catalog/:id', element: React.createElement(Product, null) }),
                React.createElement(Route, { path: '/delivery', element: React.createElement(Delivery, null) }),
                React.createElement(Route, { path: '/contacts', element: React.createElement(Contacts, null) }),
                React.createElement(Route, { path: '/cart', element: React.createElement(Cart, null) })))));
};
