"use strict";

class ShoppingBasket {

    constructor() {
        console.log("init");
        this._items = {};
    }


    addItem( item ) {

        if ( item.sku in this._items ) {
            this._items[ item.sku ].quant++;
            console.log("inc stack", this._items[ item.sku ]);
            return true;
        }

        item.quant = 1;
        item.added = new Date().getTime();
        this._items[ item.sku ] = item;
        return true;
    }

    removeItem( item ) {
        if ( this._items[ item.sku ] ) {
            this._items[ item.sku ].quant--;
            if ( this._items[ item.sku ].quant == 0 )
                delete  this._items[ item.sku ];
            return true;
        }
        console.log("Removed item failed");
        return false;
    }

    empty() {
        this._items = [];
        return true;
    }

    getCount() {
        return Object.keys(this._items).length;
    }

    
    get items() {
        return this._items;
    }

    set items( items ) {
        this._items = items;
    }


}