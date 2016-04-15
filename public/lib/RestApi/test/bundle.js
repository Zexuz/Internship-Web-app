"use strict";

/**
 *
 * Used to interact with the CartService/v1
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var RestApi = function () {
    function RestApi(url, httpPromise) {
        _classCallCheck(this, RestApi);

        this._url = url;
        this.httpPromise = httpPromise;
    }

    _createClass(RestApi, [{
        key: "sendPost",
        value: function sendPost(path, qs, data, sc, ec) {
            this._makeRequest({
                method: "POST",
                url: this.url + path,
                params: qs,
                data: data,
                json: true
            }, sc, ec);
        }
    }, {
        key: "sendGet",
        value: function sendGet(path, qs, sc, ec) {
            this._makeRequest({
                method: "GET",
                url: this.url + path,
                params: qs,
                json: true
            }, sc, ec);
        }
    }, {
        key: "sendDel",
        value: function sendDel(path, qs, sc, ec) {

            this._makeRequest({
                method: "delete",
                url: this.url + path,
                params: qs,
                json: true
            }, sc, ec);
        }
    }, {
        key: "_makeRequest",
        value: function _makeRequest(options, successCallback, errorCallback) {
            this.httpPromise(options).then(successCallback).catch(errorCallback);
        }
    }, {
        key: "url",
        get: function get() {
            return this._url;
        }
    }], [{
        key: "_handelSuccess",
        value: function _handelSuccess(callback, data) {
            if (data.data.data) {
                //angular
                data = data.data;
            }

            callback(null, data.data);
        }
    }, {
        key: "_handelError",
        value: function _handelError(callback, data) {
            if (data.data.data) {
                //angular
                data = data.data;
            }

            if (data.success) {
                return callback(null, data.data);
            }

            callback(data.data);
        }
    }]);

    return RestApi;
}();

var ArticleApi = function (_RestApi) {
    _inherits(ArticleApi, _RestApi);

    function ArticleApi(url, $http) {
        _classCallCheck(this, ArticleApi);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ArticleApi).call(this, url, $http));
    }

    _createClass(ArticleApi, [{
        key: "getAllArticles",
        value: function getAllArticles(key, callback) {
            this.sendGet("/", {
                key: key
            }, ArticleApi._handelSuccess.bind(null, callback), ArticleApi._handelError.bind(null, callback));
        }
    }]);

    return ArticleApi;
}(RestApi);

var CartApi = function (_RestApi) {
    _inherits(CartApi, _RestApi);

    function CartApi(url, $http) {
        _classCallCheck(this, CartApi);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CartApi).call(this, url, $http));
    }

    _createClass(CartApi, [{
        key: "getMyCart",
        value: function getMyCart(key, callback) {
            this.sendGet("/", {
                key: key
            }, CartApi._handelSuccess.bind(null, callback), CartApi._handelError.bind(null, callback));
        }
    }, {
        key: "addItem",
        value: function addItem(item, key, callback) {
            this.sendPost("/", {
                key: key
            }, {
                sku: item.sku
            }, CartApi._handelSuccess.bind(null, callback), CartApi._handelError.bind(null, callback));
        }
    }, {
        key: "emptyMyCart",
        value: function emptyMyCart(key, callback) {
            this.sendDel("/", {
                key: key
            }, CartApi._handelSuccess.bind(null, callback), CartApi._handelError.bind(null, callback));
        }
    }, {
        key: "removeItem",
        value: function removeItem(item, key, callback) {
            this.sendDel("/" + item.sku, {
                key: key
            }, CartApi._handelSuccess.bind(null, callback), CartApi._handelError.bind(null, callback));
        }
    }, {
        key: "getReceipt",
        value: function getReceipt(key, callback) {
            this.sendGet("/Receipt", {
                key: key
            }, CartApi._handelSuccess.bind(null, callback), CartApi._handelError.bind(null, callback));
        }
    }, {
        key: "pay",
        value: function pay(key, callback) {
            this.sendPost("/Pay", {
                key: key
            }, {}, CartApi._handelSuccess.bind(null, callback), CartApi._handelError.bind(null, callback));
        }
    }]);

    return CartApi;
}(RestApi);

var StatsApi = function (_RestApi) {
    _inherits(StatsApi, _RestApi);

    function StatsApi(url, $http) {
        _classCallCheck(this, StatsApi);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StatsApi).call(this, url, $http));
    }

    _createClass(StatsApi, [{
        key: "getAllInfo",
        value: function getAllInfo(key, callback) {
            this.sendGet("/", {
                key: key
            }, StatsApi._handelSuccess.bind(null, callback), StatsApi._handelError.bind(null, callback));
        }
    }]);

    return StatsApi;
}(RestApi);


var Stats = function () {
    function Stats() {
        _classCallCheck(this, Stats);
    }

    _createClass(Stats, [{
        key: 'getTotalSoldToday',
        value: function getTotalSoldToday() {

            var totalSum = 0;

            for (var i = 0; i < this.apiData.length; i++) {
                var sale = this.apiData[i];

                totalSum += this.getTotalSumForSale(sale);
            }
            return totalSum;
        }
    }, {
        key: 'getTotalSumForSale',
        value: function getTotalSumForSale(sale) {

            var totalSum = 0;

            for (var i = 0; i < sale._items.length; i++) {
                var item = sale._items[i];

                totalSum += Number(item.salePrice) * item.quant;
            }

            return totalSum;
        }
    }, {
        key: 'getCashiers',
        value: function getCashiers() {

            var cashiers = [];

            for (var i = 0; i < this.apiData.length; i++) {
                var sale = this.apiData[i];

                var index = this._indexOf(cashiers, ['owner', 'email'], sale.owner.email);
                if (index === -1) {
                    cashiers.push(sale);
                    continue;
                }

                cashiers[index]._items.push.apply(cashiers[index]._items, sale._items);
            }

            return cashiers;
        }
    }, {
        key: '_indexOf',
        value: function _indexOf(array, propArray, value) {

            for (var j = 0; j < array.length; j++) {
                if (array[j][propArray[0]][propArray[1]] === value) //hotfix AF
                    return j;
            }

            return -1;
        }
    }, {
        key: 'apiData',
        set: function set(apiData) {
            this._apiData = apiData;
        },
        get: function get() {
            return this._apiData;
        }
    }]);

    return Stats;
}();
