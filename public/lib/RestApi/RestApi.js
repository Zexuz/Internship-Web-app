"use strict";

class RestApi {


    constructor( url, $http ) {
        this._url = url;
        this.$http = $http;
    }

    sendPost( path, data, sc, ec ) {
        this._makeRequest({
            method: "POST",
            url: this.url + path,
            data: data
        }, sc, ec);
    }

    sendGet( path, sc, ec ) {
        this._makeRequest({
            method: "GET",
            url: this.url + path
        }, sc, ec);
    }

    _makeRequest( options, successCallback, errorCallback ) {
        this.$http(options).then(successCallback, errorCallback);
    }



    get url() {
        return this._url;
    }
}