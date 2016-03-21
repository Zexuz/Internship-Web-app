var app = angular.module('myApp');

app.controller('receiptController', ['$scope', 'CartFactory', 'UserFactory', function ($scope, cart, user) {
    $scope.receipt = "Loading receipt";
    cart.getReceipt(user.getUserInfo().id, function (err,receipt) {
        console.log(err);
        $scope.receipt = receipt
    });

}]);