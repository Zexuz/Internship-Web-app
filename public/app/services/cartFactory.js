var app = angular.module('myApp');

app.factory('CartFactory', ['$http', 'CartService', function ($http, apiUrl) {

    var service = new CartApi(apiUrl, $http);
    var res = {};

    res.getMyCart = function (key, callback) {
        service.getMyCart(key, callback);
    };

    res.addItem = function (item, key, callback) {
        service.addItem(item, key, callback);
    };

    res.emptyMyCart = function (key, callback) {
        service.emptyMyCart(key, callback)
    };

    res.removeItem = function (item, key, callback) {
        service.removeItem(item, key, callback)
    };

    res.getReceipt = function (key, callback) {
        service.getReceipt(key, callback);
    };


    return res;

}]);

