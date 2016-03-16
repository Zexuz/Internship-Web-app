"use strict";

var express = require('express');
var router = express.Router();

var ZReport = require('../lib/ZReport');

var SimpleRes = require('../lib/SimpleResponse');


router.post("/",addInfo);//used to add info, like start date,end date, change price button, clear cart

function addInfo(req,res){

}

module.exports = router;