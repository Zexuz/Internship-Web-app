angular.module('myApp').factory('LoginFactory', [ 'UserFactory', '$http', function ( user, $http ) {

    var res = {};

    res.initGoogleAuth = function ( callback ) {
        gapi.load('auth2', function () {//load in the auth2 api's, without it gapi.auth2 will be undefined

            if ( res.GoogleAuth ) {
                console.log("using old gapi");
                return callback();
            }
            console.log("init gapi");
            res.GoogleAuth = gapi.auth2.init(
                {
                    client_id: '810399730223-922f1ahb6281ce72fvrm7u6ou6g52bb0.apps.googleusercontent.com'
                }
            );

            callback();
        });
    };


    res.loginToGoogle = function ( callback ) {
        res.GoogleAuth.signIn().then(function ( googleUser ) {
            callback(googleUser.getAuthResponse().id_token);
        });
    };

    res.logOut = function ( callback ) {

        res.GoogleAuth.signOut().then(function () {
            console.log('User signed out.');
            user.deleteUserInfo();
            callback();
        });
    };

    res.login = function ( user_token, callback ) {
        $http({
            method: "post",
            url: "http://localhost:3000/CashierService/v1/Cashier",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: "key=" + user_token
        }).then(function successCallback( response ) {
            if ( response.data.success === true ) {
                return callback(null, response.data.data);
            }
            callback(true, null);

        }, function errorCallback( response ) {
            callback(true, null);
        });
    };


    return res;

} ]);