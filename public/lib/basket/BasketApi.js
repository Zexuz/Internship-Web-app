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

    removeItem( sku, key, callback ) {
        this.sendDel("?key=" + key, { sku: sku },
            BasketApi._handelSuccess.bind(null, callback),
            BasketApi._handelError.bind(null, callback))
    }

    static _handelSuccess( callback, data ) {
        callback(null, data.data);
    }

    static _handelError( callback, data ) {
        callback(data.data);
    }


}