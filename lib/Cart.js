"use strict";

var Promise = require('bluebird');
var rp = require('request-promise');

class ShoppingCart {

    constructor(cartId) {
        this.cartId = cartId;
        this._items = [];
    }

    addItem(sku) {

        var self = this;
        return new Promise(function (resolve, reject) {

            var options = {
                uri: "http://localhost:3000/ItemService/v1/Items",
                json: true
            };

            rp(options).then(function (data) {

                var products = data.data;

                for (var i = 0; i < products.length; i++) {
                    var item = products[i];
                    if (sku === item.sku) {

                        var index = self.indexOfItem(item);
                        if (index > -1) {
                            self._items[index].quant++;

                            return resolve(true);
                        }

                        item.quant = 1;
                        item.added = new Date().getTime();
                        self._items.push(item);
                        return resolve(true);
                    }

                }

                reject(new Error("No item with that sku in database"));
            });


        });
    }

    removeItem(item) {

        var index = this.indexOfItem(item);
        if(index === -1) {
            return false;
        }

        if (index > -1) {
            this._items[index].quant--;
            if (this._items[index].quant == 0) {
                this._items.splice(index, 1);
            }
            return true;
        }
        console.log("Removed item failed");
        return false;
    }

    empty() {
        return this._items = [];
    }

    pay(creditCard) {
        //send a post to the server with the credentials
    }

    getCount() {
        return this._items.length;
    }

    contains(item) {
        return (index > this.indexOfItem(item));
    }

    indexOfItem(item) {
        for (var i = 0; i < this._items.length; i++) {
            if (item.sku === this._items[i].sku) {
                return i;
            }
        }
        return -1;
    }


    toJson() {
        var self = this;
        return {
            id: self.id,
            items: self.items
        }
    }

    getTotalPrice() {
        var totalSum = 0;

        for (var i = 0; i < this.items.length; i++) {
            var sum = parseFloat(this.items[i].salePrice);

            if (isNaN(sum)) {
                alert("This is your pilot speaking, we have failed. Please fix this");
            }

            totalSum += sum * this.items[i].quant;
        }

        return totalSum;
    }

    getTotalVat() {
        var VATmoney = 0;
        var totalSum = 0;

        for (var i = 0; i < this.items.length; i++) {

            if (this.items[i].VAT === 0) {
                this.items[i].VAT = 1;
            }

            var item = this.items[i];

            var salePrice = item.salePrice * item.quant;

            VATmoney += salePrice * (item.VAT / 100);

            totalSum += salePrice;
        }

        return {
            percent: (VATmoney / totalSum) * 100,//this should be how much the VAT% was
            money: VATmoney
        };


    }

    get id() {
        return this.cartId;
    }

    get items() {
        return this._items;
    }

    set items(items) {
        this._items = items;
    }


}

module.exports = ShoppingCart;