import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ExampleStore } from './data';
export function getBugId(req) {
    return Number(req.query.bug_id) || Number(process.env.BUG_ID) || 0;
}
var indexHtmlContent = readFileSync(join(__dirname, '..', '..', "dist", "index.html")).toString();
var indexHtml = function (req, res) {
    res.send(indexHtmlContent.replace('</head>', "<script>var process={env:{BUG_ID:'".concat(getBugId(req), "'}}</script></head>")));
};
var store = new ExampleStore();
export var router = express.Router();
router.get('/', indexHtml);
router.get('/catalog', indexHtml);
router.get('/catalog/:id', indexHtml);
router.get('/delivery', indexHtml);
router.get('/contacts', indexHtml);
router.get('/cart', indexHtml);
router.get('/api/products', function (req, res) {
    var products = store.getAllProducts(getBugId(req));
    res.json(products);
});
router.get('/api/products/:id(\\d+)', function (req, res) {
    var bugId = getBugId(req);
    var id = Number(req.params.id);
    if (bugId === 3) {
        id = 0;
    }
    var product = store.getProductById(id);
    res.json(product);
});
router.post('/api/checkout', function (req, res) {
    var bugId = getBugId(req);
    if (bugId === 2) {
        res.json({ id: Date.now() });
    }
    else {
        var id = store.createOrder(req.body);
        var data = { id: id };
        res.json(data);
    }
});
router.get('/api/orders', function (req, res) {
    var orders = store.getLatestOrders();
    res.json(orders);
});
