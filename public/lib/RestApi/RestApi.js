"use strict";



class RestApi {


    constructor(url, $http) {
        this._url = url;
        this.$http = $http;
    }

    sendPost(path, qs, data, sc, ec) {
        this._makeRequest({
            method: "POST",
            url: this.url + path,
            params: qs,
            data: data
        }, sc, ec);
    }

    sendGet(path, qs, sc, ec) {
        this._makeRequest({
            method: "GET",
            url: this.url + path,
            params: qs
        }, sc, ec);
    }

    sendDel(path, qs, sc, ec) {

        this._makeRequest({
            method: "delete",
            url: this.url + path,
            params: qs
        }, sc, ec);
    }

    /**
     *
     * @param options - Has a Method, path, query string, [POST DATA]
     * @param successCallback
     * @param errorCallback
     * @private
     */
    _makeRequest(options, successCallback, errorCallback) {
        this.$http(options).then(successCallback, errorCallback);
    }


    get url() {
        return this._url;
    }
}