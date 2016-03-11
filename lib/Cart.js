"use strict";

class ShoppingCart {

    constructor( cartId ) {
        this.cartId = cartId;
        this._items = [];
    }

    addItem( item ) {

        var index = this.indexOfItem(item);

        if ( index > -1 ) {
            this._items[ index ].quant++;
            return true;
        }

        item.quant = 1;
        item.added = new Date().getTime();
        this._items.push(item);
        return true;
    }

    removeItem( item ) {
        var index = this.indexOfItem(item);

        if ( index > -1 ) {
            this._items[ index ].quant--;
            if ( this._items[ index ].quant == 0 ) {
                this._items.splice(index, 1);
            }
            return true;
        }
        console.log("Removed item failed");
        return false;
    }

    empty() {
        return this._items = [];
    }

    pay( creditCard ) {
        //send a post to the server with the credentials
    }

    getCount() {
        return this._items.length;
    }

    contains( item ) {
        return (index > this.indexOfItem(item));
    }

    indexOfItem( item ) {
        for ( var i = 0; i < this._items.length; i++ ) {
            if ( item.sku === this._items[ i ].sku ) {
                return i;
            }
        }
        return -1;
    }

    static getCartFromId( id ) {
        for ( var i = 0; i < __carts.length; i++ ) {
            if ( __carts[ i ].cartId == id ) {
                return __carts[ i ];
            }
        }

        return false;
    }

    toJson() {
        var self = this;
        return {
            id: self.id,
            items: self.items
        }
    }

    get id() {
        return this.cartId;
    }

    get items() {
        return this._items;
    }

    set items( items ) {
        this._items = items;
    }


}

module.exports = ShoppingCart;