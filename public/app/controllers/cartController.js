var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'CartFactory', 'userFactory', 'Articles', function ( $scope, $http, cart, userFactory, Articles ) {

    //get the token aka user id
    var token = userFactory.getData('googleUser').token;

    //set the article
    $scope.items = Articles.query();

    getMyItems(token, cart, function ( items ) {
        $scope.myItems = items;
    });

    $scope.addItem = function ( article ) {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }
        cart.addItem(article, token, function ( err, updatedCart ) {
            if ( err ) {
                return showError(err);
            }
            $scope.myItems = updatedCart.items;
        })

    };


    $scope.removeItem = function ( item ) {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }

        cart.removeItem(item, token, function ( err, updatedCart ) {
            if ( err ) {
                return showError(err);
            }

            console.log(updatedCart);
            $scope.myItems = updatedCart.items;
        });


    };


    $scope.getMyBasket = function () {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }

        getMyItems(token, cart, function ( items ) {
            $scope.myItems = items;
        });
    };


    $scope.emptyMyCart = function () {
        if ( !token ) {
            return Materialize.toast("You are not logged in, please login!");
        }


        cart.emptyMyCart(token, function ( err, updatedCart ) {
            if ( err ) {
                return showError(err);
            }

            $scope.myItems = updatedCart.items;
        });
    }


} ]);

function showError( err ) {
    Materialize.toast(err.data.Error);
    console.log(err);
}

function getMyItems( token, cart, callback ) {
    cart.getMyCart(token, function ( err, response ) {
        if ( err ) {
            return showError(err);
        }

        callback(response.data.items);
    });
}