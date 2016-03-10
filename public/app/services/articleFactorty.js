angular.module('myApp').factory('Articles', [ '$resource', function ( $resource ) {
    return $resource('http://localhost:3000/ItemService/v1/Items');
} ]);