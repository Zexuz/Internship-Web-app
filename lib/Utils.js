module.exports.indexOf = function ( array, prop, value ) {

    for ( var i = 0; i < array.length; i++ ) {
        if ( array[ i ][ prop ] == value ) {
            return i;
        }
    }
    return -1;
};