var app = angular.module('myApp');


app.factory('UserFactory', function () {

    var savedData = {};
    savedData['user'] = getUserInfo();

    var userSaveIndex = "user";

    var res = {};

    res.saveData = function (index, data) {
        savedData[index] = data;
    };

    res.getData = function (index) {
        return savedData[index] || {};
    };

    res.getUserInfo = function () {
        return getUserInfo();
    };

    res.saveUserInfo = function (data) {
        if (data.token && data.name && data.email) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
        }

        savedData[userSaveIndex] = data;
    };

    res.deleteUserInfo = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    };


    res.userSaveIndex = userSaveIndex;

    return res;

});

function getUserInfo() {
    return {
        token: localStorage.getItem("token"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
    };
}