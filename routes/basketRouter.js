"use strict";
var request = require('request');

var express = require('express');
var router = express.Router();

var Basket = require('../lib/Basket');
var SimpleRes = require('../lib/SimpleResponse');

router.use(logger);

router.get('/', getMyCart);
router.post('/', addItem);
router.delete('/', emptyMyCart);
router.get('/:sku', getItem);
router.delete('/:sku', deleteItem);

function getMyCart( req, res ) {
    SimpleRes.sendSimpleResponse(req, res, true, req.myApp.basket.toJson());
}

function addItem( req, res ) {

    request("http://localhost:3000/ItemService/v1/Items", function ( error, response, body ) {
        if ( error || response.statusCode != 200 ) {
            SimpleRes.sendSimpleResponse(req, res, false, { Error: `could not fetch database!` }, 404);
            return;
        }

        var json;

        try {
            json = JSON.parse(body);
        } catch ( e ) {
            SimpleRes.sendSimpleResponse(req, res, false, { Error: `Can't get database` }, 500);
            return;
        }

        var sku = req.params.sku || req.body.sku;

        var products = json;
        for ( var i = 0; i < products.length; i++ ) {
            if ( sku === products[ i ].sku ) {
                req.myApp.basket.addItem(products[ i ]);
                return SimpleRes.sendSimpleResponse(req, res, true, products[ i ])
            }

        }


        SimpleRes.sendSimpleResponse(req, res, false, { Error: `could not find article in database ${sku}` }, 404);

    })

}

function emptyMyCart( req, res ) {
    var userBasket = Basket.getBasketFromId(req.query.key);

    if ( !userBasket ) {
        res.status(404).json({ Error: `could not fetch basket associated with this key ${req.query.key}` });
        return;
    }
    userBasket.empty();

    SimpleRes.sendSimpleResponse(req, res, true, true, 200);

}

function getItem( req, res ) {
    var sku = req.params.sku;

    console.log("sku!!::::", sku);
    console.log("sku!!::::", sku);
    console.log("sku!!::::", sku);
    console.log("sku!!::::", sku);
    console.log("sku!!::::", sku);
    console.log("sku!!::::", sku);
    var userBasket = Basket.getBasketFromId(req.query.key);

    if ( !userBasket ) {
        res.status(404).json({ Error: `could not fetch basket associated with this key ${req.query.key}` });
        return;
    }

    var index = userBasket.indexOfItem(sku);
    if ( index > -1 ) {
        SimpleRes.sendSimpleResponse(req, res, true, userBasket.items[ index ]);
        return;
    }

    SimpleRes.sendSimpleResponse(req, res, false, { Error: 'Item not in basket' }, 404);
}

function deleteItem( req, res ) {
    var sku = req.params.sku;

    var basket = Basket.getBasketFromId(req.query.key);

    var index = basket.indexOfItem({ sku: parseInt(sku) });
    if ( index === -1 ) {
        SimpleRes.sendSimpleResponse(req, res, false, { Error: 'Item not in basket' }, 404);
        return;
    }

    basket.removeItem(basket.items[ index ]);
    SimpleRes.sendSimpleResponse(req, res, true, basket.items[ index ]);

}

/*
 Code for controlling the inventory

 Basket.getItems(function ( items ) {

 var foundItem = false;
 for ( var i = 0; i < items.length; i++ ) {
 if ( req.params.sku === items[ i ].sku + "" ) { // convert this to a string
 foundItem = true;
 break;
 }
 }

 if ( !foundItem ) {
 SimpleRes.sendSimpleResponse(req, res, false, { Error: `No item in database with that SKU ${req.params.sku}` }, 404);
 return;
 }

 if ( !userBasket.addItem(items[ i ]) ) {
 SimpleRes.sendSimpleResponse(req, res, false, { Error: "Can't add item(s) to basket!" }, 500);
 return;
 }

 var basket = {
 id: userBasket.basketId,
 items: userBasket.items
 };


 SimpleRes.sendSimpleResponse(req, res, true, basket);
 });


 */

/*
 getItemsFromDataBase(function ( err, items ) {
 if ( err ) {
 SimpleRes.sendSimpleResponse(req, res, false, err, 500);
 return;
 }

 for ( var i = 0; i < items.length; i++ ) {
 if ( items[ i ].sku == req.params.sku ) {
 return SimpleRes.sendSimpleResponse(req, res, true, items[ i ]);
 }
 }

 SimpleRes.sendSimpleResponse(req, res, false, { Error: 'No such item with ' + `${req.params.sku}` }, 404);

 });


 function getItemsFromDataBase( callback ) {
 request('http://localhost:3000/ItemService/v1/Items', function ( error, response, body ) {
 if ( !error && response.statusCode == 200 ) {
 callback(null, JSON.parse(body));
 return;
 }

 callback(error ? error : response.statusCode, null);
 })
 }
 */

function logger( req, res, next ) {
    var key = req.query.key || req.body.key;
    var logString = `Method : ${req.method}, Key : ${req.query.key}, Path : BasketService/v1/Basket${req.path}, Date: ${new Date()}`;
    console.log(logString);


    if ( !key ) {
        let data = { Error: "Need key" };
        return SimpleRes.sendSimpleResponse(req, res, false, data, 400);
    }

    var basket = Basket.getBasketFromId(key);
    if ( !basket ) {
        let data = { Error: "No basket with that key" };
        return SimpleRes.sendSimpleResponse(req, res, false, data, 403);
    }


    req.myApp = {};
    req.myApp.basket = basket;

    next();
}


module.exports = router;
