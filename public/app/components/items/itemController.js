var app = angular.module("myApp");

app.controller('itemController', [ '$scope', '$http', 'Item', 'BasketService', function ( $scope, $http, Item, basketService ) {


    basketService.login("admin", function ( err, data ) {
        if ( err )return;

        basketService.loadItems("admin", function ( err, items ) {
            if ( err )return;

            $scope.items = items;
        });
    });

    $scope.addItem = function ( item ) {
        Item.save({sku:item.sku}, function ( res ) {
            console.log(res);
        }, function ( err ) {
            console.log(err);
            Materialize.toast("Can't add item to basket!");

        });
    };


} ]);