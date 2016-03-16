"use strict";

class StatsApi extends RestApi {

    constructor( url, $http ) {
        super(url, $http);
    }

    getAllInfo( key, callback ) {
        this.sendGet("/",
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }


}