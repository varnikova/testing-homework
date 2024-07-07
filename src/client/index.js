import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from './Application';
import { ExampleApi, CartApi } from './api';
import { initStore } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
var basename = '/hw/store';
var api = new ExampleApi(basename);
var cart = new CartApi();
var store = initStore(api, cart);
var application = (React.createElement(BrowserRouter, { basename: basename },
    React.createElement(Provider, { store: store },
        React.createElement(Application, null))));
var root = createRoot(document.getElementById("root"));
root.render(application);
