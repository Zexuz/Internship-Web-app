"use strict";

class Receipt {

    constructor() {

    }

    getReceipt() {

        return {

            date: new Date(),
            items: this.cart.items,
            seller: this.cart.cartId,
            totalPrice: this.cart.getTotalPrice()

        };


    }

}