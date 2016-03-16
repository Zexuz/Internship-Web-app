"use strict";

class ZReport {

    constructor( id, company ) {

        if ( typeof id !== "number" || !(company instanceof require('./Company')) ) {
            console.log(typeof id);
            console.log(company instanceof require('./Company'));

            throw new Error('Not valid arguments in ZReport');
        }

        this.id = id;
        this.company = company; // need to be a instance of Company
        this.startDate = new Date();
    }

    close() {
        this.endDate = new Date();
    }
}

module.exports = ZReport;