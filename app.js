var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');



var cartRouter = require('./routes/cartRouter');
var itemRouter = require('./routes/itemRouter');
var cashierRouter = require('./routes/cashierRouter');
var statsRouter = require('./routes/statsRouter');

var app = express();

//Serve favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

/*
 This is so we can log everything
 */
var loggerRouter = express.Router();
var AuthHelper = require('./lib/helpers/AuthHelper');
var authHelper = new AuthHelper();
loggerRouter.use(authHelper.logger.bind(authHelper));
app.use('/', loggerRouter);


app.use('/CashierService/v1/Cashier/Cart', cartRouter);
app.use('/ItemService/v1/Items', itemRouter);
app.use('/CashierService/v1/Cashier', cashierRouter);
app.use('/StatsService/v1/Stats', statsRouter);



module.exports = app;
