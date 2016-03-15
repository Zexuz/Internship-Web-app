var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'CartFactory', 'UserFactory', 'articles', 'ToastFactory', function ( $scope, $http, cart, userFactory, articles, Toast ) {

    var strNotLoggedIn = "You are not logged in, please login!";
    //get the token aka user id
    var token = userFactory.getUserInfo().token;

    //set the article
    $scope.items = Articles.query();

    getMyItems(token, cart, function ( items ) {
        $scope.myItems = items;
    });

    $scope.addItem = function ( article ) {
        if ( !token ) Toast.showError(strNotLoggedIn);

        cart.addItem(article, token, function ( err, updatedCart ) {
            if ( err ) return Toast.showError;
            $scope.myItems = updatedCart.items;
        })

    };


    $scope.removeItem = function ( item ) {
        if ( !token ) Toast.showError(strNotLoggedIn);

        cart.removeItem(item, token, function ( err, updatedCart ) {
            if ( err ) return Toast.showError;

            console.log(updatedCart);
            $scope.myItems = updatedCart.items;
        });


    };


    $scope.getMyCart = function () {
        if ( !token ) Toast.showError(strNotLoggedIn);

        getMyItems(token, Toast, cart, function ( items ) {
            $scope.myItems = items;
        });
    };


    $scope.emptyMyCart = function () {
        if ( !token ) Toast.showError(strNotLoggedIn);

        cart.emptyMyCart(token, function ( err, updatedCart ) {
            if ( err ) return Toast.showError;

            $scope.myItems = updatedCart.items;
        });
    }

    $scope.initCollapsible = function () {
        $(document).ready(function () {

            console.log("done");
        });
    };

    //does not work?
    $scope.initCollapsible();

    //load my items
    $scope.getMyCart();

    //set the article
    articles.getAllArticles(function ( err, data ) {
        if ( err ) return Toast.showError(err);

        $scope.items = data;
        //init all the modals after we fetched articles
        $('.modal-trigger').leanModal();
    });

        setTimeout(function () {

            $(document).ready(function () {
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });

                $('.modal-trigger').leanModal();

                console.log("done");
            });
        },1000);

        console.log("Asdasdasdasdasd");
    });

    $scope.initCollapsible = function () {

    };

    $scope.initCollapsible();


} ]);

function showError( err ) {
    Materialize.toast(err.Error);
    console.warn(err.Error);
}

function getMyItems( token, Toast, cart, callback ) {
    cart.getMyCart(token, function ( err, updatedCart ) {
        if ( err ) return Toast.showError;

        callback(updatedCart.items);
    });
}