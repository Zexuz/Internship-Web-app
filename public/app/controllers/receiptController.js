var app = angular.module('myApp');

app.controller('receiptController', ['$scope', 'CartFactory', 'UserFactory', function ($scope, cart, user) {
    $scope.receipt = "Loading receipt";


    if (user.getUserInfo() == null) {
        return;
    }

    cart.getReceipt(user.getUserInfo().id, function (err, receipt) {
        console.log(err);
        $scope.receipt = receipt
    });

}]);