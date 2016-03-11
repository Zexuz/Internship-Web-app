"use strict";
var request = require('request');
var SimpleResponse = require('../lib/SimpleResponse');
var ShoppingCart = require('../lib/Cart');

var express = require('express');
var router = express.Router();

router.post('/login', function ( req, res ) {
    var token = req.body.token;

    var url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";

    isTokenValid(url, token, function ( err, data ) {
        if ( err ) {
            console.log(err);
            SimpleResponse.sendSimpleResponse(req, res, false, err, 401);
            return;
        }

        if (!ShoppingCart.getCartFromId(token) ){
            __carts.push(new ShoppingCart(token));
        }

        SimpleResponse.sendSimpleResponse(req, res, true, data);
    })


});

function isTokenValid( url, token, callback ) {
    request(url + token, function ( error, response, body ) {
            if ( !error && response.statusCode == 200 ) {

                callback(null, body);
                return;
            }

            callback(response.statusCode);
        }
    )
}


module.exports = router;