(function () {
    'use strict';
    window.app = window.app || {};
    let numOfCounters = 0;
    window.app.createCounter = () => {
        numOfCounters++;
        let count = 0;
        function getCount() {
            return count;
        };
        function increment() {
            count++;
        };
        function getNumOfCounters() {
            return numOfCounters;
        }
        return {
            getCount,
            increment,
            getNumOfCounters
        };
    };
}());
