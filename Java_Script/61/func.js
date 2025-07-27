'use strict';
function farToCel(t) {
    const x = (t - 32) * 5 / 9;
    console.log(x);
    return x;
}
function celToFar(t) {
    const x = (t / 5) * 9 + 32;
    console.log(x);
    return x;
}
farToCel(32);
farToCel(212);
celToFar(0);
celToFar(100);
alert(farToCel(prompt('What is the temp?')));