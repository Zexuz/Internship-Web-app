var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'CartFactory', 'UserFactory', 'Articles', function ( $scope, $http, cart, userFactory, Articles ) {

    //get the token aka user id
    var token = userFactory.getUserInfo().token;

    //set the article
    $scope.items = Articles.query();

    getMyItems(token, cart, function ( items ) {
        $scope.myItems = items;
    });

    $scope.addItem = function ( article ) {
        if ( !token ) return Materialize.toast("You are not logged in, please login!");

        cart.addItem(article, token, function ( err, updatedCart ) {
            if ( err ) {
                return showError(err);
            }
            $scope.myItems = updatedCart.items;
        })

    };


    $scope.removeItem = function ( item ) {
        if ( !token ) return Materialize.toast("You are not logged in, please login!");

        cart.removeItem(item, token, function ( err, updatedCart ) {
            if ( err ) {
                return showError(err);
            }

            console.log(updatedCart);
            $scope.myItems = updatedCart.items;
        });


    };


    $scope.getMyCart = function () {
        if ( !token ) return Materialize.toast("You are not logged in, please login!");

        getMyItems(token, cart, function ( items ) {
            $scope.myItems = items;
        });
    };


    $scope.emptyMyCart = function () {
        if ( !token ) return Materialize.toast("You are not logged in, please login!");

        cart.emptyMyCart(token, function ( err, updatedCart ) {
            if ( !token ) return Materialize.toast("You are not logged in, please login!");

            $scope.myItems = updatedCart.items;
        });
    }

    $scope.initCollapsible = function () {
        $(document).ready(function () {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            console.log("done");
        });
    }


} ]);

function showError( err ) {
    Materialize.toast(err.Error);
    console.warn(err.Error);
}

function getMyItems( token, cart, callback ) {
    cart.getMyCart(token, function ( err, updatedCart ) {
        if ( err ) return showError(err);

        callback(updatedCart.items);
    });
}