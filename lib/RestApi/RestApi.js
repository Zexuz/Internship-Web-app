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