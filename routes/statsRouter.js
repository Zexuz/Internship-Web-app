"use strict";

var express = require('express');
var router = express.Router();

var SimpleRes = require('../lib/SimpleResponse');

var tempData = require('../resources/salesInfoTemp');

router.get("/",getAllInfo);

function getAllInfo(req,res){

    SimpleRes.sendSuccess(req,res,tempData.SALES);

}

module.exports = router;