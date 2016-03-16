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

            .otherwise({
                redirectTo: '/start'
            });
    } ]);

app.constant('url', "http://localhost:3000");
app.constant('CartService', "CartService/v1/Cart");
app.constant('ItemService', "ItemService/v1/Items");
app.constant('UserService', "UserService/v1/User");
app.constant('StatsService', "StatsService/v1/Stats");


