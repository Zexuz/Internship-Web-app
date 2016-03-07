"use strict";

class ShoppingBasket extends RestApi{

    constructor(url,user) {
        //user.id is the unique users id
        this._items = [];
    }

    addItem( item ) {

        var index = this._getIndex(item);

        if ( index > -1 ) {
            this._items[ index ].quant++;
            console.log("inc stack", this._items[ index ]);
            return true;
        }

        item.quant = 1;
        item.added = new Date().getTime();
        this._items.push(item);
        return true;
    }

    removeItem( item ) {
        var index = this._getIndex(item);

        if ( index > -1 ) {
            this._items[ index ].quant--;
            if ( this._items[ index ].quant == 0 )
                this._items.slice(index, 1);
            return true;
        }
        console.log("Removed item failed");
        return false;
    }

    empty() {
        this._items = [];
        return true;
    }

    pay(creditCard){
        //send a post to the server with the credentials
    }

    getCount() {
        return this._items.length;
    }

    _contains( item ) {
        return (index > this._getIndex(item));
    }

    _getIndex( item ) {
        for ( var i = 0; i < this._items.length; i++ ) {
            if ( item.sku === this._items[ i ].sku ) {
                return i;
            }
        }
        return -1;
    }


    get items() {
        return this._items;
    }

    set items( items ) {
        this._items = items;
    }


}