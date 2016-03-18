"use strict";

var RestApi = require('../RestApi');

class StatsApi extends RestApi {

    constructor( url, $http ) {
        super(url, $http);
    }

    getAllInfo( key, callback ) {
        this.sendGet("/",
            {
                key: key
            },
            StatsApi._handelSuccess.bind(null, callback),
            StatsApi._handelError.bind(null, callback));
    }


}

module.exports = StatsApi;