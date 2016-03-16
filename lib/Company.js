"use strict";

class Company {


    constructor( options ) {

        if ( Object.keys(options).length === 0 ) throw new Error("Wrong company info");
        if ( typeof options.name === "undefined" ) throw new Error("Wrong company info");
        if ( typeof options.orgNum === "undefined" ) throw new Error("Wrong company info");


        for ( var key in options ) {
            if ( options.hasOwnProperty(key) )
                this[ key ] = options[ key ];
        }

    }

    containsKey( key ) {
        return Object(this).containsKey(key);
    }
}

module.exports = Company;