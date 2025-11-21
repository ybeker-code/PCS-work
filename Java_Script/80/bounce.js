//(function () {
'use strict';
const canvas = document.querySelector('#canvas');
const colorPicker = document.querySelector('#color');
const numberInput = document.querySelector('#number');
const button = document.querySelector('#button');
const balls = [];

const context = canvas.getContext('2d');
resizeCanvas();

button.addEventListener('click', makeBall);

function makeBall(e) {
    e.preventDefault();
    const newBall = new Ball();
    balls.push(newBall);
}

setInterval(drawBalls, 50);
function drawBalls() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(element => {
        element.x += element.dx;
        element.y += element.dy;
        bounce(element);
        context.beginPath();
        context.fillStyle = element.color;
        context.arc(element.x, element.y, (element.size), 0, (Math.PI * 2));
        context.fill();
    });
}

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function bounce(ball) {
    if (ball.x < ball.size || ball.x + ball.size > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.size || ball.y + ball.size > canvas.height) {
        ball.dy = -ball.dy;
    }
}

class Ball {
    dx = 3;
    dy = 3;

    constructor() {
        this.color = colorPicker.value;
        this.size = parseInt(numberInput.value);
        this.x = this.size;
        this.y = this.size;
    }
}
//}());