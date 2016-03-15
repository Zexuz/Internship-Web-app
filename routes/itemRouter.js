var express = require('express');
var router = express.Router();

var Items = require('../lib/Items');
var SimpleRes = require('../lib/SimpleResponse');

var VAT = require('../resources/VAT');

var savedItems = null;

router.get('/', function ( req, res ) {

    if ( savedItems == null )
        Items.getItems(function ( items ) {
            if ( !items ) {
                return res.status(500).json({ Error: 'Could not fetch items from database' });
            }


            //for now this is hardcoded (HARDCODED,FIX)
            for ( var i = 0; i < items.length; i++ ) {
                items[ i ].VAT = VAT.vat25; //adds 25% VAT to the item
            }

            savedItems = items;
            SimpleRes.sendSuccess(req, res, savedItems);
        });
    else {
        SimpleRes.sendSuccess(req, res, savedItems);
    }
});

router.get('/:sku', function ( req, res ) {
    console.log("got one");
});

module.exports = router;


