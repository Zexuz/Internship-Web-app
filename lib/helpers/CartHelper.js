"use strict";

var Cart = require('./../Cart');

class CartHelper {


    constructor() {
        this.activeCarts = []; //todo make this fetch activeCarts in the database
        this._paidCarts = [];
        this.cartIds = 0;
    }

    getCartByCashiersId( cashiersId ) {

        for ( var i = 0; i < this.activeCarts.length; i++ ) {
            if ( this.activeCarts[ i ].owner === cashiersId ) {
                return this.activeCarts[ i ];
            }
        }

        return false;
    }

    addPayedCart( cart ) {
        this._paidCarts.push(cart);
    }
    
    get paidCarts(){
        return this._paidCarts;
    }


}

module.exports = CartHelper;