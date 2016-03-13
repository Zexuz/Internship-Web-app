"use strict";
var request = require('request');

var express = require('express');
var router = express.Router();

var Cart = require('../lib/Cart');
var SimpleRes = require('../lib/SimpleResponse');

router.use(logger);

router.get('/', getMyCart);
router.post('/', addItem);
router.delete('/', emptyMyCart);
router.get('/:sku', getItem);
router.delete('/:sku', deleteItem);

function getMyCart(req, res) {
    SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
}

function addItem(req, res) {

    request("http://localhost:3000/ItemService/v1/Items", function (error, response, body) {
        if (error || response.statusCode != 200) {
            SimpleRes.sendError(req, res, {Error: `could not fetch database!`}, 404);
            return;
        }

        var json;

        try {
            json = JSON.parse(body);
        } catch (e) {
            SimpleRes.sendError(req, res, {Error: `Can't get database`}, 500);
            return;
        }

        var sku = req.params.sku || req.body.sku;

        var products = json;
        for (var i = 0; i < products.length; i++) {
            if (sku === products[i].sku) {
                req.myApp.cart.addItem(products[i]);
                return SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
            }

        }


        SimpleRes.sendError(req, res, {Error: `could not find article in database ${sku}`}, 404);

    })

}

function emptyMyCart(req, res) {

    req.myApp.cart.empty();
    SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
}

function getItem(req, res) {
    var sku = req.params.sku;

    var index = req.myApp.cart.indexOfItem(sku);
    if (index > -1) {
        SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
        return;
    }

    SimpleRes.sendError(req, res, {Error: 'Item not in cart'}, 404);
}

function deleteItem(req, res) {
    var sku = req.params.sku;


    var index = req.myApp.cart.indexOfItem({sku: parseInt(sku)});
    if (index === -1) {
        SimpleRes.sendError(req, res, {Error: 'Item not in cart'}, 404);
        return;
    }

    req.myApp.cart.removeItem(req.myApp.cart.items[index]);
    SimpleRes.sendSuccess(req, res, req.myApp.cart.toJson());
}

function logger(req, res, next) {
    var key = req.query.key;
    var logString = `Method : ${req.method}, Key : yes, Path : CartService/v1/Cart${req.path}, Date: ${new Date()}`;
    console.log(logString);


    if (!key) {
        let data = {Error: "Need key"};
        return SimpleRes.sendError(req, res, data, 400);
    }

    var cart = Cart.getCartFromId(key);
    if (!cart) {
        let data = {Error: "No cart with that key"};
        return SimpleRes.sendError(req, res, data, 403);
    }

    //add the user cart to the req object
    req.myApp = {};
    req.myApp.cart = cart;

    next();
}


module.exports = router;
