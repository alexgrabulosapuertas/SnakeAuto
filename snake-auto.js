document.title = 'Snake';
document.head.innerHTML = '<link rel="icon" href="favicon.ico">';

const body = document.querySelector('body');
body.style.background = '#779';
body.style.textAlign = 'center';
body.innerHTML = '<canvas></canvas><nav></nav>';

const canvas = document.querySelector('canvas');
canvas.width = canvas.height = 400;
const ctx = canvas.getContext('2d');
const span = document.querySelector('nav');
span.innerHTML = '<h2>Score: <span id="score"></span></h2>'
const point = document.getElementById('score');

const size = 40;
let snake, food, score, direction;

document.addEventListener('keydown', keyPush);

function controlAuto() {
    let file = snake[0].y;

    if (snake[0].x === 0 && snake[0].y !== 0) {
        snake.pop();
        snake.unshift({
            x: snake[0].x,
            y: (snake[0].y/size - 1)*size
        });
    } else
    // -->
    if (snake[0].x < (canvas.width/size - 1)*size && file/size % 2 === 0) {
        snake.pop();
        snake.unshift({
            x: (snake[0].x/size + 1)*size,
            y: snake[0].y
        });
    }

    // <--
    else if ((snake[0].x > size && file/size % 2 !== 0) || (snake[0].x === size && file === (canvas.height/size - 1) * size)){
        snake.pop();
        snake.unshift({
            x: (snake[0].x/size - 1)*size,
            y: snake[0].y
        });
    } 

    // BAJAR
    else if ((snake[0].x === (canvas.width/size - 1)*size && file/size % 2 === 0 && snake[0].y !== (canvas.height/size - 1) * size) || 
                (snake[0].x === size && file/size % 2 !== 0 && snake[0].y !== (canvas.height/size - 1) * size)) {
        snake.pop();
        snake.unshift({
            x: snake[0].x,
            y: (snake[0].y/size + 1)*size
        });
    }
    
}

function start() {
    snake = [
        { x: 1*size, y: 0*size },
        { x: 2*size, y: 0*size },
        { x: 3*size, y: 0*size }
    ];
    
    food = {
        x: Math.floor(Math.random() * canvas.width/size) * size,
        y: Math.floor(Math.random() * canvas.height/size) * size
    };

    score = 0;
    point.innerHTML = score; 
    direction = 'null';
}

function draw() {
    for (let i = 0; i < canvas.width; i+=size) {
        for (let j = 0; j <canvas.height; j+= size) {
            ctx.fillStyle = '#22a';
            ctx.fillRect(i, j, size, size);
            ctx.strokeStyle = '#eef';
            ctx.strokeRect(i, j, size, size);
        }
    }

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = '#272';
        ctx.fillRect(snake[i].x, snake[i].y, size, size);
        ctx.strokeStyle = '#151';
        ctx.strokeRect(snake[i].x, snake[i].y, size, size);
    }

    ctx.fillStyle = '#a22';
    ctx.fillRect(food.x, food.y, size, size);

    
    controlAuto();
    eatFood();
    finish();
}

function keyPush(event) {
    switch(event.keyCode) {
        case 37:
            if (direction!== 'RIGHT') {
                direction = 'LEFT';
            }
            break;
        case 38:
            if (direction!== 'DOWN') {
                direction = 'UP';
            }
            break;
        case 39:
            if (direction!== 'LEFT') {
                direction = 'RIGHT';
            }
            break;
        case 40:
            if (direction!== 'UP') {
                direction = 'DOWN';
            }
            break;
        default:
            direction = 'PAUSE';
    }
}

function eatFood() {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * canvas.width/size) * size,
                y: Math.floor(Math.random() * canvas.height/size) * size
            };
            let lastTail = {
                x: snake[snake.length-1].x,
                y: snake[snake.length-1].y
            };
            snake.push(lastTail);
            point.innerHTML = score; 
        }
    }
}

function finish() {
    if (score >= (canvas.width/size) * (canvas.height/size)) {
        direction = 'null';
        alert('Has ganado!!');
        start();
    }
    if (snake[0].x >= canvas.width || snake[0].x < 0 || snake[0].y >= canvas.height || snake[0].y < 0) {
        start();
    }
}

start();

setInterval(draw, 1000/10);