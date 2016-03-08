var express = require('express');

var basketRouter = require('./routes/basketRouter');
var itemRouter = require('./routes/itemRouter');

var app = express();

app.use('/BasketService/v1/Basket', basketRouter);
app.use('/ItemService/v1/Items', itemRouter);

app.use(express.static('public'));


module.exports = app;
