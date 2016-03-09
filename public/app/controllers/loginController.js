var app = angular.module('myApp');


app.controller('loginController', [ '$scope', 'userFactory', '$http', function ( $scope, loginC, $http ) {

    var googleUser = loginC.getData("googleUser");

    if ( googleUser.token ) {
        $scope.status = "You are logged as :" + googleUser.name;
    } else {
        $scope.status = "Not logged in!";
    }

    gapi.load('auth2', function () {//load in the auth2 api's, without it gapi.auth2 will be undefined
        gapi.auth2.init(
            {
                client_id: '810399730223-922f1ahb6281ce72fvrm7u6ou6g52bb0.apps.googleusercontent.com'
            }
        );
    });

    $scope.onLogInButtonClick = function () {
        var GoogleAuth = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init
        //add a function to the controller so ng-click can bind to it

        GoogleAuth.signIn().then(function ( googleUser ) {//request to sign in
            var profile = googleUser.getBasicProfile();
            console.log('Name : ' + profile.getName());
            console.log('Email: ' + profile.getEmail());

            var id_token = googleUser.getAuthResponse().id_token;
            var user = {
                token: id_token,
                name: profile.getName(),
                email: profile.getEmail()
            };
            loginC.saveData("googleUser", user);
            $scope.status = "Got key from google, checking key...";

            $scope.isTokenValid(function ( err,loggedIn ) {

                if(loggedIn){
                    $scope.status = "You are now logged in as " + profile.getName();
                    return;
                }

                $scope.status = "The token is invalid, try again";
            });

        });
    };

    $scope.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    $scope.isTokenValid = function ( callback ) {
        var user_token = loginC.getData("googleUser").token;
        $http({
            method: "post",
            url: "http://localhost:3000/UserService/v1/User/login",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: "token=" + user_token
        }).then(function successCallback( response ) {
            if ( response.data.success === true ) {
                return callback(null, true);
            }
            callback(true, null);

        }, function errorCallback( response ) {
            callback(true, null);
        });
    };

} ]);