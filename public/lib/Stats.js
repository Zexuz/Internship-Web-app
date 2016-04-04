"use strict";

class Stats {


    constructor() {
    }


    getTotalSoldToday() {

        var totalSum = 0;

        for ( var i = 0; i < this.apiData.length; i++ ) {
            var sale = this.apiData[ i ];

            totalSum += this.getTotalSumForSale(sale);
        }
        return totalSum;
    }

    getTotalSumForSale( sale ) {

        var totalSum = 0;

        for ( var i = 0; i < sale._items.length; i++ ) {
            var item = sale._items[ i ];

            totalSum += Number(item.totalPrice) * item.quant;
        }

        return totalSum;
    }

    getCashiers() {

        var cashiers = [];


        for ( var i = 0; i < this.apiData.length; i++ ) {
            var sale = this.apiData[ i ];

            var index = this._indexOf(cashiers, 'owner', sale.owner);
            if ( index === -1 ) {
                cashiers.push(sale);
                continue;
            }

            cashiers[index]._items.push.apply( cashiers[index]._items,sale._items)
        }


        return cashiers;

    }

    _indexOf( array, prop, value ) {

        for ( var j = 0; j < array.length; j++ ) {
            if ( array[ j ][ prop ] === value )
                return j;
        }

        return -1;
    }

    set apiData( apiData ) {
        this._apiData = apiData;
    }

    get apiData() {
        return this._apiData;
    }

}

