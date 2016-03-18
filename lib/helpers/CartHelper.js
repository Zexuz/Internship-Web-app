"use strict";

var Cart = require('./../Cart');

class CartHelper {


    constructor() {
        this.carts = []; //todo make this fetch carts in the database
    }

    getCartByCashiersId( cashiersId ) {

        for ( var i = 0; i < this.carts.length; i++ ) {
            if ( this.carts[ i ].owner === cashiersId ) {
                return this.carts[ i ];
            }
        }

        return false;
    }

    createCart( cashiersId ) {
        this.carts.push(new Cart(cashiersId));
    }


}

module.exports = CartHelper;