var app = angular.module('myApp');

app.factory('CartFactory', [ '$http', 'BasketServiceApiURL', function ( $http, BASKETSERVICEAPIURL ) {

    var service = new BasketApi(BASKETSERVICEAPIURL, $http);
    var res = {};

    res.login = function ( key, callback ) {
        service.login(key, callback);
    };

    res.loadItems = function ( key, callback ) {
        service.getItemsFromStore(key, callback);
    };

    return res;

} ]);

