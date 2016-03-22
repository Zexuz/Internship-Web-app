"use strict";

var SimpleResponse = require('../lib/SimpleResponse');
var Cashier = require('../lib/Cashier');
var Cart = require('../lib/Cart');

var express = require('express');
var router = express.Router();

/***Routers***/
router.post('/', login);
router.get('/', listAllLoggedInCashiers);
router.delete('/', logOut);

//======================================================
//======================================================
//======================================================

function login( req, res ) {
    var key = req.body.key;

    Cashier.validateKey(key)

        .then(checkIfCashierIsLoggedIn.bind(null, req.app.locals.cashierHelper))
        .then(logCashierIn.bind(null, req.app.locals.cashierHelper))
        .then(createCart.bind(null, req.app.locals.cashierHelper, req.app.locals.cartHelper))
        .then(responseLoginSuccess.bind(null, req, res))
        .catch(function ( data ) {
            console.log(data);
            SimpleResponse.sendError(req, res, { Error: data.message }, 401);
        });


}

function listAllLoggedInCashiers( req, res ) {
    var data = req.app.locals.cashierHelper.getAllLoggedInCashiers();
    SimpleResponse.sendSuccess(req, res, data);
}

function logOut( req, res ) {
    var cashierHelper = req.app.locals.cashierHelper;

    var cashierId = req.query.key;

    if ( !isCashierLoggedIn(cashierHelper, cashierId) ) {
        return SimpleResponse.sendError(req, res, "User not logged in", 404)
    }

    cashierHelper.removeCashier(cashierHelper.getCashierFromIndex(cashierHelper.indexOfCashierById(cashierId)));
    SimpleResponse.sendSuccess(req, res, true);

}


/***Functions***/

function createCart( cashierHelper, cartHelper, cashier ) {

    cashier.cart = new Cart(++cartHelper.cartIds, cashier.id);

    cashierHelper.addCashier(cashier);
    console.log("added cashier", cashier.name);

    return cashier;
}

function checkIfCashierIsLoggedIn( cashierHelper, googleInfo ) {

    if ( isCashierLoggedIn(cashierHelper, googleInfo.sub) ) {
        throw new Error("Cashier already logged in");
    }

    return googleInfo
}

function logCashierIn( cashierHelper, googleInfo ) {
    var id = googleInfo.sub;
    var name = googleInfo.name;
    var email = googleInfo.email;

    return new Cashier(id, name, email);
}

function isCashierLoggedIn( cashierHelper, id ) {

    var loggedInCashiers = cashierHelper.getAllLoggedInCashiers();

    for ( var i = 0; i < loggedInCashiers.length; i++ ) {

        if ( loggedInCashiers[ i ].id === id ) {
            return true;
        }
    }
    return false;
}

function responseLoginSuccess( req, res, cashier ) {
    SimpleResponse.sendSimpleResponse(req, res, true, cashier);
}


module.exports = router;