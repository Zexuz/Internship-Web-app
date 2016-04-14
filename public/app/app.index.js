var app = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'chart.js',
    'angular-virtual-keyboard'
]);

app.config([ '$routeProvider',
    function ( $routeProvider ) {
        $routeProvider

            .when('/start', {
                templateUrl: '../views/startView.html',
                controller: 'loginController'
            })

            .when('/main', {
                templateUrl: '../views/mainView.html'
            })


            .when('/mycart', {
                templateUrl: '../views/mycartView.html',
                controller: 'cartController'
            })

            .when('/items', {
                templateUrl: '../views/itemView.html',
                controller: 'cartController'
            })

            .when('/login', {
                templateUrl: '../views/loginView.html',
                controller: 'loginController'
            })

            .when('/receipt', {
                templateUrl: '../views/receiptView.html',
                controller: 'receiptController'
            })

            .when('/stats', {
                templateUrl: '../views/statsView.html',
                controller: 'statsController'
            })

            .when('/manual', {
                templateUrl: '../views/EANView.html',
                controller: 'EANController'
            })


            .when('/scan', {
                templateUrl: '../views/scanView.html',
                controller: 'EANController'
            })


            .otherwise({
                redirectTo: '/start'
            });
    } ]);

app.constant('url', "http://robinedbom.se/");
app.constant('CartService', "CashierService/v1/Cashier/Cart");
app.constant('ItemService', "ItemService/v1/Items");
app.constant('UserService', "CashierService/v1/Cashier");
app.constant('StatsService', "StatsService/v1/Stats");


