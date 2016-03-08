"use strict";

class BasketApi extends RestApi {

    constructor( url, $http ) {
        super(url, $http);
    }

    login( key, callback ) {
        this.sendGet("/Basket?key=" + key
            , function successCallback( data ) {
                Materialize.toast("Created Basket", 2000);
                callback(null, data.data);
            }, function errorCallback( data ) {
                Materialize.toast("Error: Failed Created Basket", 4000);
                callback(data.data);
            });
    }

    getItemsFromStore( key, callback ) {
        this.sendGet("/ItemsInStore?key=" + key
            , function successCallback( data ) {
                Materialize.toast("fetched items", 2000);
                callback(null, data.data);
            }, function errorCallback( data ) {
                Materialize.toast("can't fetch items", 4000);
                callback(data.data);
            });
    }

}