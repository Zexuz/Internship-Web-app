var app = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'chart.js'
]);

app.config([ '$routeProvider',
    function ( $routeProvider ) {
        $routeProvider

            .when('/start', {
                templateUrl: '../views/startView.html',
                controller: 'startController'
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
            
            .when('/camera', {
                templateUrl: '../views/cameraView.html',
                controller: 'cameraController'
            })

            .otherwise({
                redirectTo: '/start'
            });
    } ]);

app.constant('url', "http://localhost:3000");
app.constant('CartService', "CashierService/v1/Cashier/Cart");
app.constant('ItemService', "ItemService/v1/Items");
app.constant('UserService', "CashierService/v1/Cashier");
app.constant('StatsService', "StatsService/v1/Stats");


