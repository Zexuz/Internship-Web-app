var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'CartFactory', 'userFactory', function ( $scope, $http, cart, userFactory ) {

    var token = userFactory.getData('googleUser').token;

    cart.getMyCart(token, function ( err,data ) {
        console.log("error" + JSON.stringify(err));
        console.log("data" + data);
    });


    $scope.addItem = function ( article ) {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }


    };

    $scope.removeItem = function ( item ) {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }


    };

    $scope.getMyBasket = function () {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }


    }


} ]);