var canvas = document.getElementById('myCanvas');

var ctx = canvas.getContext('2d');

document.addEventListener('keydown', keyDownEvent);

//draw Snake

var squareSnake = 15;

var snakeWidth = squareSnake;

var snakeX = canvas.width / 2;

var snakeHeight = squareSnake;

var snakeY = canvas.height / 2;

var length = 1;

var snakeBody = [{ x: snakeX, y: snakeY }];

//draw Food

var foodX = 10;

var foodY = 10;

//snake

var movX = 0;

var movY = 0;

var X = false;

var Y = false;

//score

var score = 0;

function drawSnake() {
	for (var i = 0; i < length; i++) {
		ctx.beginPath();

		ctx.rect(snakeBody[i].x, snakeBody[i].y, snakeWidth, snakeHeight);

		ctx.fillStyle = 'red';

		ctx.fill();

		ctx.closePath();
	}

	// ctx.beginPath();

	// ctx.rect(snakeBody[0].x, snakeBody[0].y, snakeWidth, snakeHeight);

	// ctx.fillStyle = 'red';

	// ctx.fill();

	// ctx.closePath();
}

function foodCoordinates() {
	while (foodX % 15 !== 0) {
		foodX = Math.floor(Math.random() * 480);
	}

	while (foodY % 15 !== 0) {
		foodY = Math.floor(Math.random() * 330);
	}
}

function drawFood() {
	if (foodX % 15 !== 0 || foodY % 15 !== 0) {
		foodCoordinates();
	} else {
		ctx.beginPath();

		ctx.rect(foodX, foodY, squareSnake, squareSnake);

		ctx.fillStyle = 'green';

		ctx.fill();

		ctx.closePath();
	}
}

function checkCollision() {
	if (snakeBody[0].x === foodX && snakeBody[0].y === foodY) {
		eatFood();
	} else if (
		snakeBody[0].x < 0 ||
		snakeBody[0].x > canvas.width - squareSnake ||
		snakeBody[0].y < 0 ||
		snakeBody[0].y > canvas.height - squareSnake
	) {
		return true;
	} else {
		return false;
	}
}

function tailColission() {
	if (length > 4 && snakeBody[0].x !== foodX && snakeBody[0].y !== foodY) {
		for (var i = 2; i < length; i++) {
			if (
				snakeBody[0].x === snakeBody[i].x &&
				snakeBody[0].y === snakeBody[i].y
			) {
				return true;
			}
		}
	}

	return false;
}

function eatFood() {
	score++;

	length++;

	snakeBody.push({ x: foodX, y: foodY });

	foodX = 10;

	foodY = 10;

	drawFood();
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

	for (var i = length - 1; i > 0; i--) {
		snakeBody[i].x = snakeBody[i - 1].x;

		snakeBody[i].y = snakeBody[i - 1].y;
	}

	snakeBody[0].x += movX;

	snakeBody[0].y += movY;

	if (checkCollision() || tailColission()) {
		clearInterval(game);

		return;
	}
}

var game = setInterval(draw, 200);
