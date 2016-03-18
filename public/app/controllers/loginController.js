var app = angular.module('myApp');


app.controller('loginController', [ '$scope', 'UserFactory', '$http', 'LoginFactory', function ( $scope, userFactory, $http, loginFactory ) {

    var googleUser = userFactory.getUserInfo();

    if ( googleUser && googleUser.name ) {
        $scope.status = "You are logged as :" + googleUser.name;
    } else {
        $scope.status = "Not logged in!";
    }

    $scope.onLogInButtonClick = function () {
        loginFactory.initGoogleAuth(function () {
            loginFactory.loginToGoogle(function ( googleToken ) {
                $scope.status = "Logged in to google successfully";
                loginFactory.login(googleToken, function ( err, googleInfo ) {
                    if ( err ) {
                        $scope.status = "Token is valid";
                        return;
                    }

                    $scope.status = "Logged in successfully as " + googleInfo.name;

                    userFactory.saveUserInfo(googleInfo);
                });
            })
        });
    };

    $scope.signOut = function () {
        loginFactory.initGoogleAuth(function () {
            loginFactory.logOut(function () {

                var googleUser = userFactory.getUserInfo();
                if ( googleUser && googleUser.name ) {
                    $scope.status = "You are logged as :" + googleUser.name;
                } else {
                    $scope.status = "Not logged in!";
                }
                $scope.$apply();

            });

        });

    };

} ]);