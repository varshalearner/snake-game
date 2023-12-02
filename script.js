const canvas = document.getElementById("canvas");
const pen = canvas.getContext('2d');
pen.fillStyle='yellow';

const cs = 50;
let food = null;
let gameOver = false;
let score = 0;
// let id = null;


const snake = {
    init_len: 5,
    direction: 'right',
    cells: [],
    createSnake: function() {
        for (let i = 0; i < this.init_len; i++) {
            this.cells.push({
                x: i,
                y: 0
            });
        }
    },
    drawSnake: function() {
        let c=1;
        for (let cell of this.cells) {
            // if(c==1)
            // else 
            pen.fillStyle = 'yellow';
            // pen.fillStyle = 'red';
            c=2;
            pen.fillRect(cell.x * cs, cell.y * cs, cs - 1, cs - 1);
        }
        c=1;
    },
    updateSnake: function(){
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;
        
        let nextX, nextY;
        
        if (this.direction === 'down') {
            nextX = headX;
            nextY = headY + 1;
        } else if (this.direction === 'left') {
            nextX = headX - 1;
            nextY = headY;
        } else if (this.direction === 'right') {
            nextX = headX + 1;
            nextY = headY;
        } else if (this.direction === 'up') {
            nextX = headX;
            nextY = headY - 1;
        }
        // colliion
        
        if (headX === food.x && headY === food.y) {
            food = getRandomFood();
            score++;
        } else {
            this.cells.shift();
        }
        //chk boundaries
        if (nextX * cs >= canvas.width || nextY * cs >= canvas.height || nextX * cs < 0 || nextY * cs < 0) {
            gameOver = true;
            pen.fillStyle = 'red';
            pen.fillText('Game Over',100,100);
            clearInterval(id);
        }
        
        //push next box move to array
        this.cells.push({
            x: nextX,
            y: nextY
        });
        
    }
}

function init() {
    snake.createSnake();
    food = getRandomFood();
    function keyPressed(e) {
        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        } else if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        } else if (e.key === 'ArrowRight') {
            snake.direction = 'right';
        } else if (e.key === 'ArrowUp') {
            snake.direction = 'up';
        }
    }
    document.addEventListener('keydown', keyPressed);
}

function update() {
    snake.updateSnake();
}

function draw() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    pen.font = '40px sans-serif';
    pen.fillText(`Score ${score}`, 100, 50);
    // pen.fillStyle = 'red';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}

function gameLoop() {
    draw();
    update();
}

function getRandomFood() {
    const foodX = Math.round(Math.random() * (canvas.width - cs) / cs);
    const foodY = Math.round(Math.random() * (canvas.height - cs) / cs);
    food = {
        x: foodX,
        y: foodY
    };
    return food;
}

init();
id = setInterval(gameLoop, 200);