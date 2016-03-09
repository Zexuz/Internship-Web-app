var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'Item', 'CartFactory', function ( $scope, $http, Item, cart ) {


    cart.login("admin", function ( err, data ) {
        if ( err )return;

        cart.loadItems("admin", function ( err, items ) {
            if ( err )return;

            $scope.items = items;
        });
    });

    $scope.addItem = function ( item ) {
        Item.save({sku:item.sku}, function ( res ) {
            console.log(res);
        }, function ( err ) {
            console.log(err);
            Materialize.toast("Can't add item to basket!",4000);
        });
    };


} ]);