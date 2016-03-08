var app = angular.module('myApp', [
    'ngRoute',
    'ngResource'
]);

app.config([ '$routeProvider',
    function ( $routeProvider ) {
        $routeProvider

            .when('/start', {
                templateUrl: './app/components/start/startView.html',
                controller: 'startController'
            })


            .when('/items', {
                templateUrl: './app/components/items/itemView.html',
                controller: 'itemController'
            })


            .otherwise({
                redirectTo: '/start'
            });
    } ]);

app.constant('BasketServiceCons', {path:"BasketService/v1"});


