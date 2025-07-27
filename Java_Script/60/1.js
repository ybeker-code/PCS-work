'use strict';

const theButton = document.querySelector('#theButton');
let clickCount = document.querySelector('#clickCount');


//let clicks = 0;

/*function handleClick() {
  // console.log('Button was clicked', ++clicks);

  clickCount.textContent = ++clicks;
}

theButton.addEventListener('click', handleClick);*/

theButton.addEventListener('click', function (e) {
  clickCount.textContent = ++clickCount;
  console.log(e);
});

//theButton.addEventListener('click', () => clickCount.textContent = ++clicks);

function add(x, y) {
  return x + y;
}

console.log(add(1,2,3));
console.log(add('hello', 'goodbye'));
