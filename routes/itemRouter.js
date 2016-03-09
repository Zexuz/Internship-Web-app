var express = require('express');
var router = express.Router();

var Items = require('../lib/Items');

var savedItems = null;

router.get('/', function ( req, res ) {

    if ( savedItems == null )
        Items.getItems(function ( items ) {
            if ( !items ) {
                return res.status(500).json({ Error: 'Could not fetch items from database' });
            }
            savedItems = items;
            res.json(items);
        });
    else{
        res.json(savedItems);
    }
});

router.get('/:sku', function ( req, res ) {
    console.log("got one");
});

module.exports = router;


