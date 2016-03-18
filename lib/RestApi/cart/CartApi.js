"use strict";

/**
 *
 * Used to interact with the CartService/v1
 */
var RestApi = require('../RestApi');

class CartApi extends RestApi {

    constructor(url, $http) {
        super(url, $http);
    }


    getMyCart(key, callback) {
        this.sendGet("/",
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }


    addItem(item, key, callback) {
        this.sendPost("/",
            {
                key: key
            }, {
                sku: item.sku
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback)
        )
        ;
    }

    emptyMyCart(key, callback) {
        this.sendDel("/",
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }

    removeItem(item, key, callback) {
        this.sendDel("/" + item.sku,
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }

    getReceipt(key, callback) {
        this.sendGet("/Receipt?key=" + key,
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }

}

module.exports = CartApi;