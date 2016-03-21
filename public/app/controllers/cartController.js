var app = angular.module("myApp");

app.controller('cartController', [ '$scope', '$http', 'CartFactory', 'UserFactory', 'ArticleFactory', 'ToastFactory', function ( $scope, $http, cart, userFactory, articles, Toast ) {

    var strNotLoggedIn = "You are not logged in, please login!";
    //get the token aka user id
    var key = userFactory.getUserInfo();

    if ( !key )return Toast.showError(strNotLoggedIn);

    $scope.addItem = function ( article ) {
        if ( !key ) Toast.showError(strNotLoggedIn);

        cart.addItem(article, key, function ( err, updatedCart ) {
            if ( err ) return Toast.showError;
            $scope.myItems = updatedCart.items;
        })

    };


    $scope.removeItem = function ( item ) {
        if ( !key ) Toast.showError(strNotLoggedIn);

        cart.removeItem(item, key, function ( err, updatedCart ) {
            if ( err ) return Toast.showError;

            console.log(updatedCart);
            $scope.myItems = updatedCart.items;
        });


    };


    $scope.getMyCart = function () {
        if ( !key ) Toast.showError(strNotLoggedIn);

        getMyItems(key, Toast, cart, function ( items ) {
            $scope.myItems = items;
        });
    };


    $scope.emptyMyCart = function () {
        if ( !key ) Toast.showError(strNotLoggedIn);

        cart.emptyMyCart(key, function ( err, updatedCart ) {
            if ( err ) return Toast.showError;

            $scope.myItems = updatedCart.items;
        });
    };

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
    articles.getAllArticles(key, function ( err, data ) {
        if ( err ) return Toast.showError(err);

        $scope.items = data;

    });

    $scope.openModal = function ( id ) {
        $('.modal-trigger').leanModal();

        $('#' + id).openModal();
    };


} ]);

function getMyItems( token, Toast, cart, callback ) {
    cart.getMyCart(token, function ( err, updatedCart ) {
        if ( err ) return Toast.showError;

        callback(updatedCart.items);
    });
}