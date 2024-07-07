import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";
var bem = cn("Contacts");
export var Contacts = function () {
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { title: "Contacts" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col" },
                React.createElement("h1", null, "Contacts"),
                React.createElement("p", null, "Have a question about our scratchers or need help placing an order? Don't hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support."),
                React.createElement("p", null, "Our friendly representatives are available during business hours to assist you with any inquiries you may have."),
                React.createElement("p", null, "At our store, customer satisfaction is our priority, and we're committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today \u2013 we're here to help make your cat's scratching dreams a reality!")))));
};
