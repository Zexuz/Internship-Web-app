var app = angular.module("myApp");

app.controller('cartController', ['$scope', '$http', 'CartFactory', 'UserFactory', 'ArticleFactory', 'ToastFactory', function ($scope, $http, cart, userFactory, articles, Toast) {

    var strNotLoggedIn = "Du är inte inloggad, var snäll logga in";
    if (userFactory.getUserInfo() === null)return Toast.showError(strNotLoggedIn);
    //get the token aka user id
    var key = userFactory.getUserInfo().id;

    if (!key)return Toast.showError(strNotLoggedIn);

    $scope.addItem = function (article) {
        if (!key) Toast.showError(strNotLoggedIn);

        cart.addItem(article, key, function (err, updatedCart) {
            if (err) return Toast.showError(err);
            $scope.myItems = updatedCart.items;
        })

    };

    $scope.removeItem = function (item) {
        if (!key) Toast.showError(strNotLoggedIn);

        cart.removeItem(item, key, function (err, updatedCart) {
            if (err) return Toast.showError(err);

            console.log(updatedCart);
            $scope.myItems = updatedCart.items;
        });

    };

    $scope.emptyMyCart = function () {
        if (!key) Toast.showError(strNotLoggedIn);

        cart.emptyMyCart(key, function (err, updatedCart) {
            if (err) return Toast.showError(err);

            $scope.myItems = updatedCart.items;
        });
    };

    $scope.pay = function () {
        Toast.showMessage("Betalar", true);
        cart.pay(key, function (err) {
            if (err) return Toast.showError(err);

            Toast.showMessage("Betalning lyckades", true);
        })
    };

    //set the article
    articles.getAllArticles(key, function (err, data) {
        if (err) return Toast.showError(err);

        $scope.items = data;

    });

    cart.getMyCart(key, function (err, data) {
        if (err) return Toast.showError(err);

        $scope.myItems = data.items;
    });

    $scope.openModal = function (id) {
        $('.modal-trigger').leanModal();

        $('#' + id).openModal();
    };


}]);