"use strict";

var request = require('request');
var qs = require('querystring');

class Cashier {

    constructor( name, googleToken, company ) {
        this.name = name;
        this.googleToken = googleToken;
        this.company = company;

        this.isLogedIn = false;
    }

    login(){

    }



    isValidToken( callback ) {
        request('http://localhost:3000/UserService/v1/Users/login',
            {
                qs: qs.stringify({ token: this.googleToken })
            },
            function ( err, res, body ) {

                var errorTrigger = (err || res.statusCode !== 200);

                if ( errorTrigger )
                    return callback(errorTrigger, null);


                callback(null, JSON.parse(body).data);
            });


    }
}

module.exports = Cashier;