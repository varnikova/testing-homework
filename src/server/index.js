import express from 'express';
import { router } from './routes';
var port = Number(process.env.PORT) || 3000;
var basename = '/hw/store';
var app = express();
app.use(express.json());
app.use(basename, express.static('dist', { index: false }));
app.use(basename, router);
app.listen(port, '::', function () {
    console.log("Example app listening at http://localhost:".concat(port).concat(basename));
});
