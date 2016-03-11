var app = angular.module('myApp');

app.factory('CartFactory', [ '$http', 'BasketService', function ( $http, apiUrl ) {

    var service = new BasketApi(apiUrl, $http);
    var res = {};

    res.getMyCart = function ( key, callback ) {
        service.getMyBasket(key, callback);
    };

    res.addItem = function ( item, key, callback ) {
        service.addItem(item, key, callback);
    };

    res.emptyMyCart = function ( key, callback ) {
        service.emptyMyCart(key, callback)
    };

    res.removeItem = function ( item, key, callback ) {
        service.removeItem(item, key, callback)
    };


    return res;

} ]);

