"use strict";
var rp = require('request-promise');

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


function getMyCart( req, res ) {
    SimpleRes.sendSuccess(req, res, req.app.locals.tempdata.currentCashier.cart.toJson());
}

function addItem( req, res ) {

    var options = {
        uri: "http://localhost:3000/ItemService/v1/Items",
        json: true
    };

    rp(options).then(function ( data ) {
        var sku = req.params.sku || req.body.sku;

        sku = parseInt(sku);

        var products = data.data;
        for ( var i = 0; i < products.length; i++ ) {
            if ( sku === products[ i ].sku ) {
                req.app.locals.tempdata.currentCashier.cart.addItem(products[ i ]);
                return SimpleRes.sendSuccess(req, res, req.app.locals.tempdata.currentCashier.cart.toJson());
            }

        }

        SimpleRes.sendError(req, res, { Error: `could not find article in database ${sku}` }, 404);

    }).catch(function showError(data) {
        console.log(data);
        SimpleRes.sendError(req, res, { Error: `Can't get database` }, 500);
    });

}

function emptyMyCart( req, res ) {

    req.myApp.cart.empty();
    SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
}

function deleteItem( req, res ) {
    var sku = req.params.sku;


    var index = req.myApp.cart.indexOfItem({ sku: parseInt(sku) });
    if ( index === -1 ) {
        SimpleRes.sendError(req, res, { Error: 'Item not in cart' }, 404);
        return;
    }

    req.myApp.cart.removeItem(req.myApp.cart.items[ index ]);
    SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
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


/*
 function getMyReceipt( req, res ) {
 var receipt = new Receipt({ cart: req.myApp.cart }).getReceipt();


 if ( receipt.Error ) {
 return SimpleRes.sendError(req, res, receipt, 404);
 }
 router.get('/Receipt', getMyReceipt);

 SimpleRes.sendSuccess(req, res, receipt);
 }
 */

module.exports = router;
