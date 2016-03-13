"use strict";

/**
 *
 * Used to interact with the CartService/v1
 */

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

    static _handelSuccess(callback, data) {
        callback(null, data.data.data);
    }

    static _handelError(callback, data) {

        if (data.data.success) {
            console.log("false positive");
            console.log(data);
            return callback(null, data.data.data);
        }

        callback(data.data.data);
    }


}