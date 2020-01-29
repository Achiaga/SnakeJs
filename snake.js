var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

document.addEventListener('keydown', keyDownEvent);

//draw Snake
var snakeWidth = 15;
var snakeX = (canvas.width - snakeWidth) / 2;
var snakeHeight = 15;
var snakeY = (canvas.height - snakeHeight) / 2;
//snake Movement
var movX = 0;
var movY = 0;
var X = false;
var Y = false;

function drawSnake() {
	ctx.beginPath();
	ctx.rect(snakeX, snakeY, snakeWidth, snakeHeight);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}

function keyDownEvent(e) {
	switch (e.keyCode) {
		case 37:
			if (!X) {
				movX = -1;
				movY = 0;
				X = true;
				Y = false;
			}
			break;
		case 38:
			if (!Y) {
				movX = 0;
				movY = -1;
				X = false;
				Y = true;
			}
			break;
		case 39:
			if (!X) {
				movX = 1;
				movY = 0;
				X = true;
				Y = false;
			}
			break;
		case 40:
			if (!Y) {
				movX = 0;
				movY = 1;
				X = false;
				Y = true;
			}
			break;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();

	console.log(X, Y);
	snakeX += movX;

	snakeY += movY;
}

var game = setInterval(draw, 10);
