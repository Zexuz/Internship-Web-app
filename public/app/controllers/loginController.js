var app = angular.module('myApp');


app.controller('loginController', [ '$scope', 'UserFactory', '$http', 'LoginFactory', function ( $scope, userFactory, $http, loginFactory ) {



    var googleUser = userFactory.getUserInfo();

    if ( googleUser && googleUser.name ) {
        $scope.showSignOut = true;
        $scope.showLogin = false;
        $scope.status = "You are logged as :" + googleUser.name;
    } else {
        $scope.showSignOut = false;
        $scope.showLogin = true;
        $scope.status = "Du måste logga in innan du kan börja!";
    }


    $scope.onLogInButtonClick = function () {
        loginFactory.initGoogleAuth(function () {
            loginFactory.loginToGoogle().then(function ( googleUser ) {
                var googleToken = googleUser.getAuthResponse().id_token;

                $scope.status = "Logged in to google successfully";
                loginFactory.login(googleToken, function ( err, user ) {
                    if ( err ) {
                        $scope.status = "Token is valid";
                        return;
                    }

                    $scope.status = "Logged in successfully as " + user.name;

                    userFactory.saveUserInfo(user);
                    console.log(user);
                    $scope.showSignOut = true;
                    $scope.showLogin = false;
                });

            });
        });
    };


    $scope.signOut = function () {
        loginFactory.initGoogleAuth(function () {
            loginFactory.logOutFromGoogle(function () {
                loginFactory.logOut(userFactory.getUserInfo().id, function ( err ) {
                    if ( err ) {
                        return $scope.status = "There was a problem login you out!";
                    }
                    
                    $scope.status = "Successfully logged out!";
                    userFactory.deleteUserInfo();
                    $scope.showSignOut = false;
                    $scope.showLogin = true;
                });

            });

        });

    };

} ]);