var app = angular.module('myApp');

app.factory('CartFactory', [ '$http', 'BasketService', function ( $http, apiUrl ) {

    var service = new BasketApi(apiUrl, $http);
    var res = {};

    res.getMyCart = function ( key, callback ) {
        service.getMyBasket(key, callback);
    };

    res.addItem = function ( key, item, callback ) {
        service.addItem(key, item, callback);
    };

    res.emptyMyCart = function ( key, callback ) {
        service.emptyMyCart(key, callback)
    };


    return res;

} ]);

