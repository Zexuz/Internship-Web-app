"use strict";
var request = require('request');

class Articles {

    static getItems( callback ) {
        var url = "http://api.bestbuy.com/v1/products(longDescription=iPhone*%7Csku=7619002)?show=sku,name,salePrice&pageSize=100&page=5&apiKey=f4crwde3ysnxw655jrvyp32e&format=json";
        request(url, function ( error, response, body ) {
            if ( !error && response.statusCode == 200 ) {

                var res = JSON.parse(body);
                callback(res.products);
                return;
            }

            callback(null);
        })
    }

}

module.exports = Articles;
