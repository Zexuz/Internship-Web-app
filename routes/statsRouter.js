"use strict";

var express = require('express');
var router = express.Router();

var SimpleRes = require('../lib/SimpleResponse');

router.get("/", getAllInfo);

function getAllInfo( req, res ) {

    SimpleRes.sendSuccess(req, res, req.app.locals.cartHelper.paidCarts);

}

module.exports = router;