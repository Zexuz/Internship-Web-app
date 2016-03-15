angular.module('myApp').factory('ArticleFactory', [ '$http', 'ItemService', function ( $http, apiUrl ) {
    var service = new ArticleApi(apiUrl, $http);

    var res = {};

    res.getAllArticles = function (key, callback ) {
        service.getAllArticles(key,callback);
    };

    return res;
} ]);