var app = angular.module('myApp');


app.factory('UserFactory', function () {

    var savedData = {};
    var userSaveIndex = "user";


    var res = {};

    res.saveData = function ( index, data ) {
        savedData[ index ] = data;
    };

    res.getData = function ( index ) {
        return savedData[ index ] || {};
    };

    res.getUserInfo = function () {
        return JSON.parse(localStorage.getItem(userSaveIndex));
    };

    res.saveUserInfo = function ( data ) {
        localStorage.setItem(userSaveIndex, JSON.stringify(data));
    };

    res.deleteUserInfo = function () {
        localStorage.removeItem(userSaveIndex);
    };


    res.userSaveIndex = userSaveIndex;

    return res;

});