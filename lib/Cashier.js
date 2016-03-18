"use strict";

var rp = require('request-promise');
var Promise = require('bluebird');


class Cashier {

    constructor( id, name, email ) {
        this.id = id;
        this.name = name;
        this.email = email;

        this.loggedInDate = new Date();
    }


    set cart( cart ) {
        this._cart = cart;
    }

    get cart() {
        return this._cart;
    }


    static validateKey( googleToken ) {

        console.log("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + googleToken);

        var options = {
            uri: "https://www.googleapis.com/oauth2/v3/tokeninfo",
            qs: {
                id_token: googleToken
            },
            json: true
        };

        return rp(options);
    }
}

module.exports = Cashier;