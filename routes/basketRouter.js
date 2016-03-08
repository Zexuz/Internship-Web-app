"use strict";
var request = require('request');

var express = require('express');
var router = express.Router();

var Basket = require('../lib/Basket');
var SimpleRes = require('../lib/SimpleResponse');

router.use(function logger( req, res, next ) {
    var key = req.query.key;
    var logString = `Method : ${req.method}, Key : ${req.query.key}, Path : BasketService/v1/Basket${req.path}, Date: ${new Date()}`;
    console.log(logString);


    if ( !key ) {
        let data = { Error: "Need key" };
        return SimpleRes.sendSimpleResponse(req, res, false, data, 400);
    }

    if ( key !== "admin" ) {
        let data = { Error: "Key is not accepted" };
        return SimpleRes.sendSimpleResponse(req, res, false, data, 403);
    }

    next();
});

router.get('/', function ( req, res ) {
    if ( !Basket.getBasketFromId(req.query.key) ) {
        __baskets.push(new Basket(req.query.key));
        console.log("Creating basket with id :", req.query.key);
    }

    SimpleRes.sendSimpleResponse(req, res, true, Basket.getBasketFromId(req.query.key));
});

router.post('/', function ( req, res ) {
    var userBasket = Basket.getBasketFromId(req.query.key);

    if ( !userBasket ) {
        res.status(404).json({ Error: `could not fetch basket associated with this key ${req.query.key}` });
        return;
    }

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
});

router.delete('/', function ( req, res ) {
    var userBasket = Basket.getBasketFromId(req.query.key);

    if ( !userBasket ) {
        res.status(404).json({ Error: `could not fetch basket associated with this key ${req.query.key}` });
        return;
    }
    userBasket.empty();


});

router.get('/:sku', function ( req, res ) {
    var sku = req.params.sku;

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

});

router.delete('/:sku', function ( req, res ) {
    var sku = req.params.sku;

    var basket = Basket.getBasketFromId(req.query.key);

    var index = basket.indexOfItem(sku);
    if ( index > -1 ) {
        basket.removeItem(basket.items[index]);
        SimpleRes.sendSimpleResponse(req, res, true, basket.items[ index ]);
        return;
    }

    SimpleRes.sendSimpleResponse(req, res, false, { Error: 'Item not in basket' }, 404);
});


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
module.exports = router;
