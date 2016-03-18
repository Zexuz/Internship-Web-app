"use strict";

/**
 *
 * Used to interact with the CartService/v1
 */

var RestApi = require('../RestApi');

class ArticleApi extends RestApi {


    constructor( url, $http ) {
        super(url, $http);
    }

    getAllArticles( key, callback ) {
        this.sendGet("/",
            {
                key: key
            },
            ArticleApi._handelSuccess.bind(null, callback),
            ArticleApi._handelError.bind(null, callback));
    }


}

module.exports = ArticleApi;

