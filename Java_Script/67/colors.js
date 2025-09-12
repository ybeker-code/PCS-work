(function () {
    'use strict';

    let interval;
    const startButton = document.querySelector('#start');
    const colorTable = document.querySelector('#colorTable');
    const colorsArray = [];
    let increment = 10;

    function start() {
        let r = 0;
        let g = 0;
        let b = 0;

        interval = setInterval(() => {

            if ((r += increment) >= 256) {
                r = 0;

                if ((g += increment) >= 256) {
                    g = 0;

                    if ((b += increment) >= 256) {
                        b = 0;
                    }
                }
            }

            const colors = {
                color: `rgb(${g}, ${r}, ${b})`,
                backgroundColor: `rgb(${b}, ${g}, ${r})`
            };

            colorsArray.push(colors);

            changeColor(colorsArray);
            startButton.innerText = 'stop';
        }, 100);
    }

    function changeColor(array) {
        document.body.style.color = array[array.length - 1].color;
        document.body.style.backgroundColor = array[array.length - 1].backgroundColor;
        logColors(array);
    }

    function stop() {
        clearInterval(interval);
        interval = null;
        startButton.innerText = 'start';
    }

    function logColors(colors) {
        const newRow = colorTable.insertRow();
        const time = (new Date()).toLocaleString();
        newRow.innerHTML = `<td>${colors[colors.length - 1].color}</td>
        <td>${colors[colors.length - 1].backgroundColor}</td>
        <td>${time}</td>`;
    }

    startButton.addEventListener('click', () => {
        if (!interval) {
            start();
        } else {
            stop();
        }
    });

    colorTable.addEventListener('click', e => {
        console.log(e.target);
        console.log(e.target.parentElement.rowIndex);
        stop();
        colorsArray.push(colorsArray[(e.target.parentElement.rowIndex) - 1]);
        changeColor(colorsArray);
    });
}());