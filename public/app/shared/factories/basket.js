var app = angular.module('myApp');

app.factory("Item", function ( $resource ) {
    return $resource("/BasketService/v1/Basket/:sku",{sku:'@sku',key:"admin"});
});

app.factory('BasketService', [ '$http', 'BasketServiceCons', function ( $http, BSC ) {

    var service = new BasketApi(BSC.path, $http);
    var res = {};

    res.login = function ( key, callback ) {
        service.login(key, callback);
    };

    res.loadItems = function ( key, callback ) {
        service.getItemsFromStore(key, callback);
    };

    return res;

} ]);

