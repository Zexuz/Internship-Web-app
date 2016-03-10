var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'CartFactory', 'userFactory', 'Articles', function ( $scope, $http, cart, userFactory, Articles ) {


    var token = userFactory.getData('googleUser').token;

    $scope.items = Articles.query();

    getMyItems(token, cart, function ( items ) {
        $scope.myItems = items;
    });

    $scope.addItem = function ( article ) {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }
        cart.addItem(article, token, function ( err, success ) {
            if ( err ) {
                console.log(err);
                return
            }

            console.log(success);
            getMyItems(token, cart, function ( items ) {
                $scope.myItems = items;
            });

        })

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

function getMyItems( token, cart, callback ) {
    cart.getMyCart(token, function ( err, response ) {
        if ( err ) {
            Materialize.toast(err.data.Error);
            return console.log(err);
        }

        callback(response.data.items);
    });
}