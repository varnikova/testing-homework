import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";
var bem = cn("Home");
export var Home = function () {
    return (React.createElement("div", { className: bem() },
        React.createElement(Helmet, { title: "Welcome" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col bg-orange text-white py-4 bg-opacity-75" },
                React.createElement("p", { className: "display-3" }, "Welcome to Kogtetochka store!"),
                React.createElement("p", { className: "lead" }, "We have a large assortment of scratching posts!"))),
        React.createElement("div", { className: "row mb-4" },
            React.createElement("div", { className: "col-12 col-md-4 bg-light py-3" },
                React.createElement("h1", null, "Stability"),
                React.createElement("p", { className: "lead" }, "Our scratching posts are crafted with precision and designed for unparalleled stability. Made from high-quality materials, they provide a sturdy platform for your cat's scratching needs.")),
            React.createElement("div", { className: "col-12 col-md-4 bg-light py-3" },
                React.createElement("h1", null, "Comfort"),
                React.createElement("p", { className: "lead" }, "Pamper your feline friend with the luxurious comfort of our scratching posts. Covered in soft, plush fabric, they offer a cozy retreat for your cat to relax and unwind.")),
            React.createElement("div", { className: "col-12 col-md-4 bg-light py-3" },
                React.createElement("h1", null, "Design"),
                React.createElement("p", { className: "lead" }, "Engage your cat's natural instincts and keep them entertained for hours with our interactive scratching posts. Featuring built-in toys and enticing textures, they stimulate your cat's senses and encourage active play."))),
        React.createElement("div", { className: "row mb-4" },
            React.createElement("div", { className: "col-12py-3" },
                React.createElement("p", { className: "fs-1" }, "Empower Your Coding Journey with Every Scratch \u2013 Get Your Paws on Our Purr-fect Scratchers Today!")))));
};
