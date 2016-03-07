var app = angular.module('myApp');

app.factory('basket', function () {

    return new ShoppingBasket();

});


