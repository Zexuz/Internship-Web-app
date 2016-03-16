"use strict";

class ZReport {

    constructor( id, company, cashRegister ) {

        if ( typeof id !== "number" || !(company instanceof require('./Company')) ) {
            console.log(typeof id);
            console.log(company instanceof require('./Company'));

            throw new Error('Not valid arguments in ZReport');
        }

        this.id = id;
        this.company = company; // need to be a instance of Company


        this.startDate = new Date();
        this._isActive = true;
        this._cashRegister = cashRegister;
    }

    isActive() {
        return this._isActive;
    }

    close() {
        this._isActive = false;
        this.endDate = new Date();
    }

    getZReport(){
        return {
            start:this.startDate,
            end:this.endDate,
            id:this.id,
            cashRegister:this._cashRegister
        }
    }
}

module.exports = ZReport;