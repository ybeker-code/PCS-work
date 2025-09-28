'use strict';

window.app = window.app || {};
window.app.counter = (function () {
    let count = 0;
    function getCount() {
        return count;
    };
    function increment() {
        count++;
    };
    return {
        getCount,
        increment
    };
}());