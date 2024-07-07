import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { cn } from "@bem-react/classname";
import { ProductDetails } from "../components/ProductDetails";
import { productDetailsLoad } from "../store";
var bem = cn("Product");
export var Product = function () {
    var dispatch = useDispatch();
    var params = useParams();
    var id = Number(params.id);
    useEffect(function () {
        dispatch(productDetailsLoad(id));
    }, []);
    var product = useSelector(function (s) { return s.details[id]; });
    var content = product ? React.createElement(ProductDetails, { product: product }) : "LOADING";
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { title: product === null || product === void 0 ? void 0 : product.name }),
        content));
};
