"use strict";

class Receipt {

    constructor( options ) {
        options = options || {};

        this.cart = options.cart;
    }

    getReceipt() {
        if ( typeof this.cart === "undefined" ) {
            return { Error: 'no cart' };
        }

        for ( var i = 0; i < this.cart.items.length; i++ ) {
            this.cart.items[ i ].totalPrice = (this.cart.items[ i ].quant * this.cart.items[ i ].salePrice).toFixed(2);
        }


        return {

            date: new Date(),
            items: this.cart.items,
            seller: this.cart.cartId,
            totalPrice: this.cart.getTotalPrice(),
            totalVat: this.cart.getTotalVat()

        };


    }

}

module.exports = Receipt;