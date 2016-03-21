"use strict";
var express = require('express');
var router = express.Router();

var Cart = require('../lib/Cart');
var Receipt = require('../lib/Receipt');
var SimpleRes = require('../lib/SimpleResponse');

router.use(checkIfDataIsValid);

router.get('/', getMyCart);
router.post('/', addItem);
router.delete('/', emptyMyCart);
router.delete('/:sku', deleteItem);
router.get('/receipt/', getMyReceipt);

function getMyCart( req, res ) {
    SimpleRes.sendSuccess(req, res, req.app.locals.tempdata.currentCashier.cart.toJson());
}

function addItem( req, res ) {

    var sku = req.params.sku || req.body.sku;
    sku = parseInt(sku);

    req.app.locals.tempdata.currentCashier.cart.addItem(sku).then(function ( data ) {
        SimpleRes.sendSuccess(req, res, req.app.locals.tempdata.currentCashier.cart.toJson());
    }).catch(function ( data ) {
        SimpleRes.sendError(req, res, { Error: `could not find article in database ${sku}` }, 404);
    });

}

function emptyMyCart( req, res ) {
    req.app.locals.tempdata.currentCashier.cart.empty();
    SimpleRes.sendSuccess(req, res, req.app.locals.tempdata.currentCashier.cart.toJson());
}

function deleteItem( req, res ) {
    var sku = parseInt(req.params.sku);
    var success = req.app.locals.tempdata.currentCashier.cart.removeItem({ sku: sku });

    if ( success === false ) return SimpleRes.sendError(req, res, { Error: 'Item not in cart' }, 404);

    SimpleRes.sendSuccess(req, res, req.app.locals.tempdata.currentCashier.cart.toJson());
}

function checkIfDataIsValid( req, res, next ) {
    var key = req.query.key;
    var logString = `Method : ${req.method}, Key : yes, Path : CartService/v1/Cart${req.path}, Date: ${new Date()}`;
    console.log(logString);

    var cashierHelper = req.app.locals.cashierHelper;

    if ( !key ) {
        let data = { Error: "Need key" };
        return SimpleRes.sendError(req, res, data, 400);
    }

    var index = cashierHelper.indexOfCashierById(key);

    if ( index === -1 ) {
        let data = { Error: "No logged in cashier by that id" };
        return SimpleRes.sendError(req, res, data, 403);
    }

    req.app.locals.tempdata = {};
    req.app.locals.tempdata.currentCashier = cashierHelper.getCashierFromIndex(index);

    next();
}

function getMyReceipt( req, res ) {
    var myCart = req.app.locals.tempdata.currentCashier.cart;
    var receipt = new Receipt({ cart: myCart }).getReceipt();

    if ( receipt.Error ) {
        return SimpleRes.sendError(req, res, receipt, 404);
    }

    SimpleRes.sendSuccess(req, res, receipt);
}

module.exports = router;
