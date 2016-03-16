var express = require('express');
var bodyParser = require('body-parser');


var cartRouter = require('./routes/cartRouter');
var itemRouter = require('./routes/itemRouter');
var userRouter = require('./routes/userRouter');
var statsRouter = require('./routes/statsRouter');

var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/CartService/v1/Cart', cartRouter);
app.use('/ItemService/v1/Items', itemRouter);
app.use('/UserService/v1/User', userRouter);
app.use('/StatsService/v1/Stats', statsRouter);

app.use(express.static('public'));


module.exports = app;
