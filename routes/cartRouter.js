"use strict";
var express = require('express');
var router = express.Router();

var Cart = require('../lib/Cart');
var Receipt = require('../lib/Receipt');
var SimpleRes = require('../lib/SimpleResponse');


router.get('/', getMyCart);
router.post('/', addItem);
router.delete('/', emptyMyCart);
router.delete('/:sku', deleteItem);
router.get('/receipt/', getMyReceipt);


router.post('/pay/', pay);


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

function getMyReceipt( req, res ) {
    var myCart = req.app.locals.tempdata.currentCashier.cart;
    var receipt = new Receipt({ cart: myCart }).getReceipt();

    if ( receipt.Error ) {
        return SimpleRes.sendError(req, res, receipt, 404);
    }

    SimpleRes.sendSuccess(req, res, receipt);
}

function pay( req, res ) {
    var cart = req.app.locals.tempdata.currentCashier.cart;

    SimpleRes.sendSuccess(req, res, cart.toJson());
}

module.exports = router;
