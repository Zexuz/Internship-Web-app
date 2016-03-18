var app = angular.module('myApp');

app.factory('StatsFactory', [ '$http', 'StatsService', function ( $http, apiUrl ) {
    var StatsApi = require('StatsApi');
    var service = new StatsApi(apiUrl, $http);

    var res = {};

    res.getAllInfo = function ( key, callback ) {
        service.getAllInfo(key, callback);
    };

    return res;

} ]);