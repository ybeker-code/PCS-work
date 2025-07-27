'use strict';
function multiply(x, y) {
    return x * y;
}
console.log(multiply(9, 9));
console.log(multiply(8, 8));
console.log(multiply(7, 7));
function getMultiplier() {
    return (x, y) => { return x * y; };
}
const multiplier = getMultiplier();
console.log(multiplier(3, 3));
function getAnotherMultiplier(x) {
    return (y) => { return x * y; };
}
const anotherMultiplier = getAnotherMultiplier(5);
console.log(anotherMultiplier(5));