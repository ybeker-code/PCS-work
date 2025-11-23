(function () {
    'use strict';

    const SNAKE_SIZE = 64;
    let appleLoaded = false;
    const appleLocation = {
        x: SNAKE_SIZE,
        y: SNAKE_SIZE
    };
    let score = 0;
    let speed = 500;
    const crunch = document.querySelector('#crunch');
    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');

    function resizeCanvas() {
        theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
        theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    let x = 0;
    let y = 0;
    let direction = 'ArrowRight';

    const snakeHead = document.createElement('img');
    snakeHead.src = 'images/snakeHead.png';
    const apple = document.createElement('img');
    apple.src = 'images/apple.png';
    apple.onload = () => { appleLoaded = true; };

    snakeHead.onload = () => {
        play();
    };

    document.addEventListener('keydown', e => {
        console.log(e);
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                direction = e.key;
                break;
            default:
                console.log(e.key, 'is not a supported key');
        }
    });

    function wrap() {
        if (x < 0) {
            x = theCanvas.width - SNAKE_SIZE;
        }
        if (x > theCanvas.width - SNAKE_SIZE) {
            x = 0;
        }
        if (y < 0) {
            y = theCanvas.height - SNAKE_SIZE;
        }
        if (y > theCanvas.width - SNAKE_SIZE) {
            y = 0;
        }
    }

    function placeApple() {
        appleLocation.x = SNAKE_SIZE * (Math.round(Math.random() * (theCanvas.width / SNAKE_SIZE - 1)));
        appleLocation.y = SNAKE_SIZE * (Math.round(Math.random() * (theCanvas.height / SNAKE_SIZE - 1)));
    }

    function play() {
        let interval = setInterval(() => {
            context.clearRect(0, 0, theCanvas.width, theCanvas.height);

            context.font = '30px Arial';
            context.fillText(`Score: ${score}`, 250, 250);

            if (appleLoaded) {
                context.drawImage(apple, appleLocation.x, appleLocation.y);
            }

            switch (direction) {
                case 'ArrowRight':
                    x += SNAKE_SIZE;
                    break;
                case 'ArrowLeft':
                    x -= SNAKE_SIZE;
                    break;
                case 'ArrowUp':
                    y -= SNAKE_SIZE;
                    break;
                case 'ArrowDown':
                    y += SNAKE_SIZE;
                    break;
            }
            wrap();
            context.drawImage(snakeHead, x, y);
            if (appleLocation.x === x && appleLocation.y === y) {
                crunch.play();
                placeApple();
                score++;
                if (speed > 120) {
                    speed -= 20;
                }
                clearInterval(interval);
                play();
            }
        }, speed);
    }
}());
