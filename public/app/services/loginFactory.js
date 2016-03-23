angular.module('myApp').factory('LoginFactory', [ 'UserFactory', '$http', function ( user, $http ) {

    var res = {};

    res.initGoogleAuth = function ( callback ) {
        gapi.load('auth2', function () {//load in the auth2 api's, without it gapi.auth2 will be undefined

            if ( res.GoogleAuth ) {
                console.log("using old gapi");
                return callback();
            }

            res.GoogleAuth = gapi.auth2.init(
                {
                    client_id: '810399730223-922f1ahb6281ce72fvrm7u6ou6g52bb0.apps.googleusercontent.com'
                }
            );

            res.GoogleAuth.then(function ( test ) {
                console.log("aslksdfklajsdkfjalskdjf");
                console.log(test);
                callback();
            }, function ( fail ) {
                console.log("fail1");
                console.log(fail);
            });
        });
    };


    res.loginToGoogle = function ( callback ) {
        return res.GoogleAuth.signIn();
    };

    res.logOutFromGoogle = function ( callback ) {
        res.GoogleAuth.signOut().then(function () {
            callback();
        });
    };

    res.logOut = function ( key, callback ) {
        $http({
            method: "delete",
            url: "http://localhost:3000/CashierService/v1/Cashier",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: { key: key }
        }).then(function successCallback( response ) {
            if ( response.data.success === true ) {
                return callback(null, response.data.data);
            }
            callback(true, null);

        }, function errorCallback( response ) {
            callback(true, null);
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