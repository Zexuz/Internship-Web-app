var express = require('express');
var bodyParser = require('body-parser');


var basketRouter = require('./routes/basketRouter');
var itemRouter = require('./routes/itemRouter');
var userRouter = require('./routes/userRouter');

var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/BasketService/v1/Basket', basketRouter);
app.use('/ItemService/v1/Items', itemRouter);
app.use('/UserService/v1/User', userRouter);

app.use(express.static('public'));


module.exports = app;
