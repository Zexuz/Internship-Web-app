"use strict";

var ZReport = require('./ZReport');

class CashRegister {

    constructor(id,startCash,cashier) {
        this._id = id;
        this._startCash = startCash;
        this._cashier = cashier;
    }

    openZReport(){
        var databaseConnectionID;
        this.zReport = new ZReport(databaseConnectionID,this._cashier.company);
    }

    closeZReport(){

    }

    _haveActiveZReport(){
        return this.zReport && this.zReport.isActive;
    }
}

module.exports = CashRegister;