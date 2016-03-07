var app = angular.module("myApp");

app.controller('itemController', [ '$scope', '$http', 'basket', function ( $scope, $http, basket ) {

    $scope.items = [];

    $scope.getItems = function () {
        $http({
            method: 'GET',
            url: 'http://api.bestbuy.com/v1/products(longDescription=iPhone*%7Csku=7619002)?show=sku,name&pageSize=100&page=5&apiKey=f4crwde3ysnxw655jrvyp32e&format=json'
        }).then(function ( response ) {
            $scope.items = response.data.products;
        }, function ( err ) {
            console.log(err);
        })
    };
    $scope.getItems();


    //load our prev items
    $scope.myItems = basket.items;

    $scope.addItem = function ( item ) {
        basket.addItem(item)
    };

    $scope.removeItem = function ( item ) {
        basket.removeItem(item);
    };


    $scope.removeAllItems = function () {
        basket.removeItem(null, true);
    };


    $scope.getItems = function () {
        $scope.items = basket.items;
    }

} ]);