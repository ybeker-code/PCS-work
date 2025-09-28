'use strict';
// Implementing the map function
const array = [1, 2, 3, 4];
const callback = index => { return index * 2; };
// eslint-disable-next-line no-undef
const mapped = map(array, callback);
console.log(`The original array is ${array}.`);
console.log(`The mapped array is ${mapped}.`);

// Implementing the counter
// const update = () => {
//     app.counter.increment();
//     document.querySelector('#span').textContent = `${app.counter.getCount()} clicks`;
// };
// document.querySelector('#button').addEventListener('click', update);
for (let index = 0; index < 10; index++) {
    window.app.counter.increment();
}

// Creating counters
const mycounter1 = window.app.createCounter();
const mycounter2 = window.app.createCounter();
// Incrementing them
for (let index = 0; index < 5; index++) {
    mycounter1.increment();
}
for (let index = 0; index < 15; index++) {
    mycounter2.increment();
}

console.log(`The first counter is at ${window.app.counter.getCount()}`);
console.log(`The second counter is at ${mycounter1.getCount()}`);
console.log(`The third counter is at ${mycounter2.getCount()}`);

