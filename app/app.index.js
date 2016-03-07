var app = angular.module('myApp', [
    'ngRoute'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
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
    }]);


function reSize(){

}


