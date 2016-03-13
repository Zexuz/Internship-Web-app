var app = angular.module('myApp');

app.controller('receiptController', ['$scope', 'CartFactory', 'userFactory', function ($scope, cart, user) {
    $scope.receipt = "Loading receipt";
    cart.getReceipt(user.getData('googleUser').token, function (err,receipt) {
        console.log(err);
        $scope.receipt = receipt
    });

}]);