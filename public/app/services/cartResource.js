var app = angular.module('myApp');

app.factory("Item", function ( $resource ) {
    return $resource("/BasketService/v1/Basket/:sku",{sku:'@sku',key:"admin"});
});