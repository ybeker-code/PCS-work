
// The map function
// eslint-disable-next-line no-unused-vars
function map(array, callback) {
    'use strict';
    const mapped = [];
    array.forEach(element => {
        mapped.push(callback(element));
    });
    return mapped;
}