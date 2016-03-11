"use strict";

class BasketApi extends RestApi {

    constructor( url, $http ) {
        super(url, $http);
    }


    getMyBasket( key, callback ) {
        this.sendGet("?key=" + key,
            BasketApi._handelSuccess.bind(null, callback),
            BasketApi._handelError.bind(null, callback))
    }


    addItem( item, key, callback ) {
        this.sendPost("?key=" + key, { sku: item.sku },
            BasketApi._handelSuccess.bind(null, callback),
            BasketApi._handelError.bind(null, callback))
    }

    emptyMyCart( key, callback ) {
        this.sendDel("?key=" + key,
            BasketApi._handelSuccess.bind(null, callback),
            BasketApi._handelError.bind(null, callback));
    }

    removeItem( item, key, callback ) {
        this.sendDel("/" + item.sku, { key: key },
            BasketApi._handelSuccess.bind(null, callback),
            BasketApi._handelError.bind(null, callback))
    }

    static _handelSuccess( callback, data ) {
        callback(null, data.data);
    }

    static _handelError( callback, data ) {

        if ( data.data.success ) {
            console.log("false positive");
            console.log(data);
            return callback(null, data.data);
        }

        callback(data.data);
    }


}