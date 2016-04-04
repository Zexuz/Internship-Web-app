var express = require('express');
var router = express.Router();

var Items = require('../lib/Items');
var SimpleRes = require('../lib/SimpleResponse');

var VAT = require('../resources/VAT');
var Utils = require('./../lib/Utils');

var savedItems = null;

router.get('/', function ( req, res ) {

    if ( savedItems == null )
        getItems(function ( err, items ) {
            if ( err ) {
                return SimpleRes.sendError(req, res, err, 500);
            }
            SimpleRes.sendSuccess(req, res, items);

        });
    else {
        SimpleRes.sendSuccess(req, res, savedItems);
    }
});

<<<<<<< HEAD
router.get('/search', function ( req, res ) {
    var sku = req.query.sku;
    var EAN = req.query.ean;


    if ( savedItems == null ) {
        SimpleRes.sendError(req, res, { Error: 'Need to GET /Items first' }, 500)
    } else {

        var skuIndex = false;
        var EANIndex = false;

        var respond = { items: [] };


        if ( sku ) {
            console.log("sku", sku);
            skuIndex = Utils.indexOf(savedItems, 'sku', sku);

            if ( skuIndex > -1 ) {
                respond.items.push(savedItems[ skuIndex ]);
            }

        }

        if ( EAN ) {

            EANIndex = Utils.indexOf(savedItems, 'upc', EAN);
            console.log("ean", EAN, EANIndex, typeof EAN);

            console.log(savedItems[ 0 ].upc);
            console.log(typeof savedItems[ 0 ].upc);
            console.log(savedItems[ 0 ].upc == EAN);
            console.log(savedItems[ 0 ].upc === EAN);

            if ( EANIndex > -1 ) {
                respond.items.push(savedItems[ EANIndex ]);
            }

        }

        SimpleRes.sendSuccess(req, res, respond)
    }


=======
router.get('/:sku', function ( req, res ) {
    SimpleRes.sendSuccess(req, res, req.params.sku);
>>>>>>> master
});

function getItems( callback ) {
    Items.getItems(function ( items ) {
        if ( !items )
            return callback({ Error: 'Could not fetch items from database' }, null);


        //for now this is hardcoded (HARDCODED,FIX)
        for ( var i = 0; i < items.length; i++ ) {
            items[ i ].VAT = VAT.vat25; //adds 25% VAT to the item
        }

        savedItems = items;
        callback(null, savedItems);
    });
}


module.exports = router;


