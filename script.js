const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text')
const snakeLogo = document.getElementById('logo')
const scorelog = document.getElementById('score')

const gridSize = 20;
let snake = [{ x: 10, y: 10 }]
let foodpos = generateFood();
let direction = 'up'
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
console.log(!gameStarted)

console.log(foodpos)

function draw() {
    board.innerHTML = '';
    drawSnake();
    drawfood();
    checkcollision();
    updatescore();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createSnakeelement('div', 'snake')
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement);
    });
};

function createSnakeelement(tag, classname) {
    const element = document.createElement(tag);
    element.className = classname;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}



function drawfood() {
    const foodElement = createSnakeelement('div', 'food');
    setPosition(foodElement, foodpos);
    board.appendChild(foodElement);
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function move() {
    const head = { ...snake[0] }
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'left':
            head.x--;
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);

    if (head.x === foodpos.x && head.y === foodpos.y) {
        foodpos = generateFood();
        increasespeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay)
    } else {
        snake.pop();
    }

}

/* setInterval(() => {
    move();
    draw();
}, 200); */

function startGame() {
    gameStarted = true;
    instructionText.style.display = 'none';
    snakeLogo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkcollision();
        draw();
    }, gameSpeedDelay)
}

function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'space') ||
        (!gameStarted && event.key === ' ')) {
        startGame();
    } else {
        switch (event.key) {
            case 'w':
                direction = 'up';
                break;
            case 'a':
                direction = 'left';
                break;
            case 's':
                direction = 'down';
                break;
            case 'd':
                direction = 'right';
                break;
        }
    }
}

function increasespeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay = gameSpeedDelay - 5;
    }
}

function checkcollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetgame()
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetgame();
        }
    }
}

function resetgame() {
    snake = [{ x: 10, y: 10 }]
    foodpos = generateFood();
    direction = 'up';
    gameSpeedDelay = 200;
    updatescore();
    clearInterval(gameInterval);
    board.innerHTML = '';
    gameStarted = false;
    instructionText.style.display = 'block';
    snakeLogo.style.display = 'block';
    food.style.display = 'none'
}

document.addEventListener('keydown', handleKeyPress);

function updatescore() {
    const currentscore = `Score: ${snake.length - 1}`;
    score.textContent = currentscore.toString()
}