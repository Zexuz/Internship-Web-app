require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ArticleApi":[function(require,module,exports){
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


},{"../RestApi":"RestApi"}],"CartApi":[function(require,module,exports){
"use strict";

/**
 *
 * Used to interact with the CartService/v1
 */
var RestApi = require('../RestApi');

class CartApi extends RestApi {

    constructor( url, $http ) {
        super(url, $http);
    }


    getMyCart( key, callback ) {
        this.sendGet("/",
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }


    addItem( item, key, callback ) {
        this.sendPost("/",
            {
                key: key
            }, {
                sku: item.sku
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback)
        );
    }

    emptyMyCart( key, callback ) {
        this.sendDel("/",
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }

    removeItem( item, key, callback ) {
        this.sendDel("/" + item.sku,
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }

    getReceipt( key, callback ) {
        this.sendGet("/Receipt",
            {
                key: key
            },
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback));
    }

    pay( key, callback ) {
        this.sendPost("/Pay",
            {
                key: key
            }, {},
            CartApi._handelSuccess.bind(null, callback),
            CartApi._handelError.bind(null, callback)
        );
    }

}

module.exports = CartApi;
},{"../RestApi":"RestApi"}],"RestApi":[function(require,module,exports){
"use strict";


class RestApi {


    constructor( url, httpPromise ) {
        this._url = url;
        this.httpPromise = httpPromise;
    }

    sendPost( path, qs, data, sc, ec ) {
        this._makeRequest({
            method: "POST",
            url: this.url + path,
            params: qs,
            data: data,
            json: true
        }, sc, ec);
    }

    sendGet( path, qs, sc, ec ) {
        this._makeRequest({
            method: "GET",
            url: this.url + path,
            params: qs,
            json: true
        }, sc, ec);
    }

    sendDel( path, qs, sc, ec ) {

        this._makeRequest({
            method: "delete",
            url: this.url + path,
            params: qs,
            json: true
        }, sc, ec);
    }


    _makeRequest( options, successCallback, errorCallback ) {
        this.httpPromise(options).then(successCallback).catch(errorCallback);
    }

    static _handelSuccess( callback, data ) {
        if ( data.data.data ) { //angular
            data = data.data;
        }

        callback(null, data.data);
    }

    static _handelError( callback, data ) {
        if ( data.data.data ) { //angular
            data = data.data;
        }

        if ( data.success ) {
            return callback(null, data.data);
        }

        callback(data.data);
    }


    get url() {
        return this._url;
    }
}

module.exports = RestApi;
},{}],"StatsApi":[function(require,module,exports){
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
},{"../RestApi":"RestApi"}]},{},[]);
