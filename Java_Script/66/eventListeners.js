// This code listens for clicks on the buttons.
// (function () {
//     'use strict';
//     const theDiv = document.querySelector('#theDiv');
//     let number = 0;
// function createButton() {
// const newButton = document.createElement('button');
// theDiv.appendChild(newButton);
// newButton.textContent = ++number;
// newButton.addEventListener('click', createButton);
// };
// createButton();
// }());


// This code listens for clicks on the div.
(function () {
    'use strict';
    const theDiv = document.querySelector('#theDiv');
    theDiv.addEventListener('click', createButton);
    let number = 0;
    function createButton() {
        const newButton = document.createElement('button');
        theDiv.appendChild(newButton);
        newButton.textContent = ++number;
    };
    createButton();
}());