var app = angular.module('myApp');


app.factory('userFactory', function () {

    var savedData = {};

    var res = {};

    res.saveData = function ( index, data ) {
        savedData[ index ] = data;
    };

    res.getData = function ( index ) {
        return savedData[ index ]|| {};
    };


    return res;

});