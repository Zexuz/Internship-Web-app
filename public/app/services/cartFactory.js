var app = angular.module('myApp');

app.factory('CartFactory', [ '$http', 'BasketService', function ( $http, apiUrl ) {

    var service = new BasketApi(apiUrl, $http);
    var res = {};

    res.getMyCart = function ( key,callback ) {
        service.getMyBasket(key,callback);
    };

    return res;

} ]);

