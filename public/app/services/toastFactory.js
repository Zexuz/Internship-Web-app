var app = angular.module('myApp');

app.factory('ToastFactory', function () {
    var res = {};


    /**
     * show("hello") will show "hello"  for 4 sec
     *
     * show("hello", true) will show "hello"  for 4 sec
     *
     * show("hello", 4000, true) will show "hello"  for 4 sec
     *
     * show("hello", 4000, false) will show "hello"  until we close it
     *
     * show("hello", false) will show "hello"  until we close it
     *
     */
    res.show = function ( msg, duration, autoClose ) {

        //making the duration optional
        if ( typeof duration === "boolean" ) {
            autoClose = duration;
            duration = undefined;
        }else{
            autoClose = autoClose || true;
        }

        duration = duration || 4000;

        if ( autoClose )
            return Materialize.toast(msg, duration);

        Materialize.toast(msg);
    };

    res.showError = function ( err, autoClose ) {
        autoClose = autoClose || false;
        console.log("asdasdkasljdlkajlskd");


        res.show(err, autoClose);
    };

    res.showMessage = function ( message, autoClose ) {
        autoClose = autoClose || true;

        console.log("------------------------");
        console.log("------------------------");

        res.show(message, autoClose);
    };

    return res;

});