"use strict";

class AuthHelper {

    constructor() {

    }


    needsKey( req, res ) {

        if ( req.method === "GET" && req.path === "/CashierService/v1/Cashier/login" ) {
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
        console.log(`Have key : ${key == true ? 'yes' : 'no'}`);

        if ( _needsKey && key )
            console.log(`key : ${key}`);

        console.log(`Date: ${new Date()}`);
        console.log("----------------------");

        next();
    }
}

module.exports = AuthHelper;