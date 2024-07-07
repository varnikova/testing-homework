import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { cn } from '@bem-react/classname';
import { ProductItem } from '../components/ProductItem';
import { productsLoad } from '../store';
var bem = cn('Catalog');
export var Catalog = function () {
    var dispatch = useDispatch();
    var products = useSelector(function (s) { return s.products; });
    useEffect(function () {
        dispatch(productsLoad());
    }, []);
    var items = products ?
        products.map(function (p) { return (React.createElement("div", { key: p.id, "data-testid": p.id, className: "col-12 col-sm-6 col-md-4 col-lg-3" },
            React.createElement(ProductItem, { product: p }))); }) :
        'LOADING';
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { title: "Catalog" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col" },
                React.createElement("h1", null, "Catalog"))),
        React.createElement("div", { className: "row" }, items)));
};
