var app = angular.module('myApp');

app.factory('ToastFactory', function () {
    var res = {};


    res.show = function ( msg, duration, autoClose ) {
        duration = duration || 4000;
        autoClose = autoClose || true;

        //making the duration optional
        if ( duration === false ) {
            autoClose = false;
        }

        if ( autoClose )
            return Materialize.toast(msg, duration);

        Materialize.toast(msg);
    };

    res.showError = function ( err, autoClose ) {
        autoClose = autoClose || false;
        console.log("asdasdkasljdlkajlskd");
        console.log("asdasdkasljdlkajlskd");
        console.log("asdasdkasljdlkajlskd");
        console.log("asdasdkasljdlkajlskd");
        console.log("asdasdkasljdlkajlskd");
        console.log("asdasdkasljdlkajlskd");




        res.show(err, autoClose);
    };

    res.showMessage = function ( message, autoClose ) {
        autoClose = autoClose || true;

        res.show(message, autoClose);
    };

    return res;

});