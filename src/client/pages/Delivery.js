import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";
import { Image } from "../components/Image";
var bem = cn("Delivery");
export var Delivery = function () {
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { title: "Delivery" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col" },
                React.createElement("h1", null, "Delivery"),
                React.createElement("p", null, "Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely."),
                React.createElement(Image, { className: "w-25 mb-4" }),
                React.createElement("p", null, "Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games \u2013 know exactly when to expect your package and plan accordingly."),
                React.createElement("p", null, "Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.")))));
};
