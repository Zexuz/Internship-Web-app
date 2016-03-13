"use strict";

class Receipt {

    constructor(options) {
        options = options || {};

        this.cart = options.cart;
    }

    getReceipt() {
        if (typeof this.cart === "undefined") {
            return {Error: 'no cart'};
        }


        return {

            date: new Date(),
            items: this.cart.items,
            seller: this.cart.cartId,
            totalPrice: this.cart.getTotalPrice()

        };


    }

}

module.exports = Receipt;