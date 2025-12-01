(async function () {
    'use strict';

    const SNAKE_SIZE = 64;
    const snakeLocation = [{
        x: 0,
        y: 0
    }];
    let temp = {};
    let pic;
    const appleLocation = {
        x: SNAKE_SIZE,
        y: SNAKE_SIZE
    };
    let score = 0;
    let speed = 500;
    let xyz;
    const crunch = document.querySelector('#crunch');
    const gameOver = document.querySelector('#gameOver');
    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');

    function resizeCanvas() {
        theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
        theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    let direction = 'ArrowRight';

    // Load images
    const snakeHeadP = loadImage('images/snakeHead.png');
    const backgroundP = loadImage('images/desert1.jpg');
    const appleP = loadImage('images/apple.png');
    const snakeBodyDownP = loadImage('images/snakeBodyDown-up.jpg');
    const snakeBodyUpP = loadImage('images/snakeBodyUp-down.jpg');
    const snakeBodyLeftP = loadImage('images/snakeBodyLeft-right.jpg');
    const snakeBodyRightP = loadImage('images/snakeBodyRight-left.jpg');
    const snakeTailDownP = loadImage('images/snakeTailDown-up.jpg');
    const snakeTailUpP = loadImage('images/snakeTailUp-down.jpg');
    const snakeTailLeftP = loadImage('images/snakeTailLeft-right.jpg');
    const snakeTailRightP = loadImage('images/snakeTailRight-left.jpg');
    const [snakeHead, background, apple, snakeBodyDown, snakeBodyUp,
        snakeBodyLeft, snakeBodyRight, snakeTailDown,
        snakeTailUp, snakeTailLeft, snakeTailRight]
        = await Promise.all(
            [snakeHeadP, backgroundP, appleP, snakeBodyDownP, snakeBodyUpP,
                snakeBodyLeftP, snakeBodyRightP, snakeTailDownP,
                snakeTailUpP, snakeTailLeftP, snakeTailRightP
            ]);
    const snakeParts = [snakeBodyDown, snakeBodyUp,
        snakeBodyLeft, snakeBodyRight, snakeTailDown,
        snakeTailUp, snakeTailLeft, snakeTailRight];

    play();

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

    function wrapAround() {
        if (snakeLocation[0].x < 0) {
            snakeLocation[0].x = theCanvas.width - SNAKE_SIZE;
        }
        if (snakeLocation[0].x > theCanvas.width - SNAKE_SIZE) {
            snakeLocation[0].x = 0;
        }
        if (snakeLocation[0].y < 0) {
            snakeLocation[0].y = theCanvas.height - SNAKE_SIZE;
        }
        if (snakeLocation[0].y > theCanvas.width - SNAKE_SIZE) {
            snakeLocation[0].y = 0;
        }
    }

    function placeApple() {
        appleLocation.x = SNAKE_SIZE * (Math.round(Math.random() * (theCanvas.width / SNAKE_SIZE - 1)));
        appleLocation.y = SNAKE_SIZE * (Math.round(Math.random() * (theCanvas.height / SNAKE_SIZE - 1)));
    }

    // Promise
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = src;
            img.onload = resolve(img);
            img.onerror = reject();
        });
    }

    function drawSnake() {
        for (let index = 0; index < snakeLocation.length; index++) {
            if (index === 0) {
                context.drawImage(snakeHead, snakeLocation[index].x, snakeLocation[index].y);
            } else {
                context.drawImage(snakeParts[chooseImage(index)], snakeLocation[index].x, snakeLocation[index].y);
            }
        }

        function chooseImage(index) {
            xyz = (((snakeLocation[index].x - snakeLocation[index - 1].x) / SNAKE_SIZE) * 5)
                + ((snakeLocation[index].y - snakeLocation[index - 1].y) / SNAKE_SIZE);
            if (index === snakeLocation.length - 1) {
                switch (xyz) {
                    case 5:
                        pic = 6;
                        break;
                    case -5:
                        pic = 7;
                        break;
                    case 1:
                        pic = 5;
                        break;
                    case -1:
                        pic = 4;
                        break;
                }
            } else {
                switch (xyz) {
                    case 5:
                        pic = 2;
                        break;
                    case -5:
                        pic = 3;
                        break;
                    case 1:
                        pic = 1;
                        break;
                    case -1:
                        pic = 0;
                        break;
                }
            }
            return pic;
        }
    }

    function checkCrash(interval) {
        snakeLocation.forEach(element => {
            if (element.x === snakeLocation[0].x && element.y === snakeLocation[0].y) {
                if (element !== snakeLocation[0]) {
                    clearInterval(interval);
                    gameOver.play();
                }
            }
        });
    }

    function play() {
        let interval = setInterval(() => {
            context.clearRect(0, 0, theCanvas.width, theCanvas.height);

            context.drawImage(background, 0, 0, theCanvas.width, theCanvas.height);

            context.font = '30px Arial';
            context.fillText(`Score: ${score}`, 250, 250);

            context.drawImage(apple, appleLocation.x, appleLocation.y);

            switch (direction) {
                case 'ArrowRight':
                    temp = {
                        x: (snakeLocation[0].x + SNAKE_SIZE),
                        y: snakeLocation[0].y
                    };
                    break;
                case 'ArrowLeft':
                    temp = {
                        x: (snakeLocation[0].x - SNAKE_SIZE),
                        y: snakeLocation[0].y
                    };
                    break;
                case 'ArrowUp':
                    temp = {
                        x: snakeLocation[0].x,
                        y: (snakeLocation[0].y - SNAKE_SIZE)
                    };
                    break;
                case 'ArrowDown':
                    temp = {
                        x: snakeLocation[0].x,
                        y: (snakeLocation[0].y + SNAKE_SIZE)
                    };
                    break;
            }

            snakeLocation.unshift(temp);
            wrapAround();
            drawSnake();
            checkCrash(interval);
            if (appleLocation.x === snakeLocation[0].x && appleLocation.y === snakeLocation[0].y) {
                crunch.play();
                placeApple();
                score++;
                if (speed > 120) {
                    speed -= 20;
                    clearInterval(interval);
                    play();
                }
            }
            else {
                snakeLocation.pop();
            }
        }, speed);
    }
}());
