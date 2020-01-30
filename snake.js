var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
document.addEventListener('keydown', keyDownEvent);
//draw Snakevar
squareSnake = 15;
var snakeWidth = squareSnake;
var snakeX = canvas.width / 2;
var snakeHeight = squareSnake;
var snakeY = canvas.height / 2;
//draw Foodvar
foodX = 10;
var foodY = 10;
//snake
var movX = 0;
var movY = 0;
var X = false;
var Y = false;
//scorevar
score = 0;
function drawSnake() {
	ctx.beginPath();
	ctx.rect(snakeX, snakeY, snakeWidth, snakeHeight);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}
function foodCoordinates() {
	if (foodX % 15 !== 0) {
		foodX = Math.floor(Math.random() * 100);
	} else if (foodY % 15 !== 0) {
		foodY = Math.floor(Math.random() * 100);
	}
}
function drawFood() {
	if (foodX % 15 !== 0 || foodY % 15 !== 0) {
		foodCoordinates();
		console.log(foodX, foodY);
	} else {
		ctx.beginPath();
		ctx.rect(foodX, foodY, squareSnake, squareSnake);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.closePath();
	}
}
function checkCollision() {
	if (snakeX === foodX && snakeY === foodY) {
		eatFood();
	} else if (
		snakeX < 0 ||
		snakeX > canvas.width - squareSnake ||
		snakeY < 0 ||
		snakeY > canvas.height - squareSnake
	) {
		return true;
	} else {
		return false;
	}
}
function eatFood() {
	score++;
	foodX = 10;
	foodY = 10;
	drawFood();
	console.log(score);
}
function drawScore() {
	var score_text = 'Score: ' + score;
	ctx.fillStyle = 'red';
	ctx.font = 'bold 20px Arial';
	ctx.fillText(score_text, canvas.width - 100, 25);
}
function drawGrid() {
	var gridY = 0;
	var gridX = 0;
	for (var i = 0; i < canvas.width / snakeWidth; i++) {
		ctx.beginPath();
		ctx.moveTo(gridY, 0);
		ctx.lineTo(gridY, canvas.height);
		ctx.stroke();
		ctx.strokeStyle = 'white';
		ctx.closePath();
		gridY += snakeWidth;
	}
	for (var v = 0; v < canvas.height / snakeHeight; v++) {
		ctx.beginPath();
		ctx.moveTo(0, gridX);
		ctx.lineTo(canvas.width, gridX);
		ctx.stroke();
		ctx.strokeStyle = 'white';
		ctx.closePath();
		gridX += snakeHeight;
	}
}
function keyDownEvent(e) {
	switch (e.keyCode) {
		case 37:
			if (!X) {
				movX = -squareSnake;
				movY = 0;
				X = true;
				Y = false;
			}
			break;
		case 38:
			if (!Y) {
				movX = 0;
				movY = -squareSnake;
				X = false;
				Y = true;
			}
			break;
		case 39:
			if (!X) {
				movX = squareSnake;
				movY = 0;
				X = true;
				Y = false;
			}
			break;
		case 40:
			if (!Y) {
				movX = 0;
				movY = squareSnake;
				X = false;
				Y = true;
			}
			break;
		default:
			break;
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	drawGrid();
	drawFood();
	drawScore();
	snakeX += movX;
	snakeY += movY;
	if (checkCollision()) {
		clearInterval(game);
		console.log(snakeY);
		return;
	}
}
var game = setInterval(draw, 200);
