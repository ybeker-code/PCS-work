'use strict';

const array1 = ['a', 'b', 'c'];
const array2 = ['A', 'B', 'C'];
const array3 = ['A', 'B', 'c'];

// The every function
function every(array, test) {
    let result = 1;
    for (let index = 0; index < array.length; index++) {
        result = test(array[index]);
        if (result === false) {
            return false;
        }
    }
    return result;
}

function isCaps(letter) {
    return letter === letter.toUpperCase();
}

function isLower(letter) {
    return letter === letter.toLowerCase();
}
console.log('every isCaps');
console.log(every(array1, isCaps));
console.log(every(array2, isCaps));
console.log(every(array3, isCaps));
console.log('Using array.every');
console.log(array1.every(isCaps));
console.log(array2.every(isCaps));
console.log(array3.every(isCaps));
console.log('every isLower');
console.log(every(array1, isLower));
console.log(every(array2, isLower));
console.log(every(array3, isLower));
console.log('Using array.every');
console.log(array1.every(isLower));
console.log(array2.every(isLower));
console.log(array3.every(isLower));

// The some func
const arrays = [['a', 'b', 'c'], ['A', 'B', 'C'], ['A', 'B', 'c']];
const isCapsFunc = letter => letter === letter.toUpperCase();
const isLowerFunc = letter => letter === letter.toLowerCase();
function some(array, test) {
    for (let index = 0; index < array.length; index++) {
        if (test(array[index])) {
            return true;
        }
    }
    return false;
}

console.log('some isCaps');
for (let index = 0; index < arrays.length; index++) {
    console.log(some(arrays[index], isCapsFunc));
}
console.log('Using array.some');
for (let index = 0; index < arrays.length; index++) {
    console.log(arrays[index].some(isCapsFunc));
}

console.log('some isLower');
for (let index = 0; index < arrays.length; index++) {
    console.log(some(arrays[index], isLowerFunc));
}
console.log('Using array.some');
for (let index = 0; index < arrays.length; index++) {
    console.log(arrays[index].some(isLowerFunc));
}

// Only if
let array = [90, 100, 85, 105, 98, 102];
console.log(`Before- ${array}`);
function onlyIf(array, test, action) {
    for (let index = 0; index < array.length; index++) {
        if (test(array[index])) {
            array[index] = action(array[index]);
        }
    }
}
function add1(number) { return ++number; }
onlyIf(array, number => { return number >= 100; }, add1);
console.log(`After- ${array}`);

const x = array.filter(number => { return number < 100; });
function subtract1(element, index, array) {
    --array[index];
}
x.forEach(subtract1);
console.log(x);

