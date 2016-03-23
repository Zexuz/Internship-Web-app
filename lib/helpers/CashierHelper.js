"use strict";

class CashierHelper {


    constructor() {
        this.cashiers = [];
    }


    addCashier( cashier ) {
        this.cashiers.push(cashier);
    }

    removeCashier( cashier ) {
        this.cashiers.splice(this.indexOfCashierById(cashier.id), 1);
    }

    getAllLoggedInCashiers() {
        var res = [];

        for ( var i = 0; i < this.cashiers.length; i++ ) {
            var cashier = this.cashiers[ i ];
            res.push(
                {
                    name: cashier.name,
                    email: cashier.email,
                    id: cashier.id,
                    loggedInDate: cashier.loggedInDate
                }
            )
        }
        return res;

    }

    indexOfCashierById( id ) {
        for ( var i = 0; i < this.cashiers.length; i++ ) {
            if ( this.cashiers[ i ].id === id ) {
                return i;
            }
        }

        return -1;
    }

    getCashierFromIndex( index ) {
        return this.cashiers[ index ];
    }

}

module.exports = CashierHelper;