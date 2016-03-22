"use strict";

var SimpleRes = require('../SimpleResponse');

class AuthHelper {

    constructor() {

    }


    needsKey( req, res ) {

        if ( req.method === "POST" && req.path === "/CashierService/v1/Cashier" ) { //this is login method
            return false;
        }

        if ( req.method === "GET" && req.path === "/ItemService/v1/Items" ) { //this is for getting the article register
            return false;
        }

        return true;
    }

    logger( req, res, next ) {

        var _needsKey = this.needsKey(req, res);
        var key = req.query.key;

        console.log(`Method : ${req.method}`);
        console.log(`Path : ${req.path}`);
        console.log(`Needs key : ${_needsKey}`);
        console.log(`Have key : ${key ? 'yes' : 'no'}`);

        if ( _needsKey && key )
            console.log(`key : ${key}`);

        console.log(`Date: ${new Date()}`);
        console.log("----------------------");


        if ( !_needsKey ) return next();


        if ( _needsKey && !key ) {
            let data = { Error: "Need key" };
            return SimpleRes.sendError(req, res, data, 400);
        }

        var cashierHelper = req.app.locals.cashierHelper;
        var index = cashierHelper.indexOfCashierById(key);

        if ( index === -1 ) {
            let data = { Error: "No logged in cashier by that id" };
            return SimpleRes.sendError(req, res, data, 403);
        }

        req.app.locals.tempdata = {};
        req.app.locals.tempdata.currentCashier = cashierHelper.getCashierFromIndex(index);

        next();
    }
}

module.exports = AuthHelper;