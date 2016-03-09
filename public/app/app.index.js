var app = angular.module('myApp', [
    'ngRoute',
    'ngResource'
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


            .otherwise({
                redirectTo: '/start'
            });
    } ]);

app.constant('BasketServiceApiURL', "BasketService/v1");


