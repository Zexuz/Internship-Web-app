"use strict";

class RestApi {


    constructor( url ) {
        this._url = url;
    }

    sendPost( path, data, sc, ec ) {
        RestApi._makeRequest({
            method: "POST",
            url: this.url + path,
            data: data
        }, sc, ec);
    }

    sendGet( path, sc, ec ) {
        RestApi._makeRequest({
            method: "GET",
            url: this.url + path
        }, sc, ec);
    }

    static _makeRequest( options, successCallback, errorCallback ) {
        $http(options).then(successCallback, errorCallback);
    }


    get url() {
        return this._url;
    }
}