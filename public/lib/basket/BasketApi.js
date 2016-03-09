"use strict";

class BasketApi extends RestApi {

    constructor( url, $http ) {
        super(url, $http);
    }

    getMyBasket( key, callback ) {
        this.sendGet("?key=" + key
            , function successCallback( data ) {
                callback(null, data.data);
            }, function errorCallback( data ) {
                callback(data.data);
            });
    }


    addItem( sku, key, callback ) {
        this.sendPost("/Basket?key=" + key, { sku: sku }
            , function successCallback( data ) {
                callback(null, data.data);
            }, function errorCallback( data ) {
                callback(data.data);
            });
    }

    removeItem( sku, key, callback ) {
        this.sendDel("/Basket?key=" + key, { sku: sku }
            , function successCallback( data ) {
                callback(null, data.data);
            }, function errorCallback( data ) {
                callback(data.data);
            });
    }

}