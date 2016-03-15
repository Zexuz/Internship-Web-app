"use strict";
var request = require('request');

class Articles {

    static getItems( callback ) {
        var url = "http://api.bestbuy.com/v1/products(longDescription=iPhone*%7Csku=7619002)?show=sku,name,salePrice,largeImage,categoryPath&pageSize=100&page=5&apiKey=f4crwde3ysnxw655jrvyp32e&format=json";
        request(url, function ( error, response, body ) {
            if ( !error && response.statusCode == 200 ) {

                var res = JSON.parse(body);

                for ( var i = 0; i < res.products.length; i++ ) {
                    var item = res.products[ i ];


                    item.mediumImage = res.products[ i ].largeImage;
                    item.fullName = item.name;

                    var itemNameLengthMax = 80;

                    if ( item.name.length > itemNameLengthMax ) {
                        item.shortName = item.name.substring(0, itemNameLengthMax) + "...";
                    } else {
                        item.shortName = item.name;
                    }


                    res.products[ i ] = item;
                }

                callback(res.products);
                return;
            }

            callback(null);
        })
    }

}

module.exports = Articles;
