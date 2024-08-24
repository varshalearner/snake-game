const canvas = document.getElementById("canvas");
        const pen = canvas.getContext('2d');
        pen.fillStyle = 'yellow';

        const cs = 50;
        let food = null;
        let gameOver = false;
        let score = 0;
        let id = null;

        const snake = {
            init_len: 5,
            direction: 'right',
            cells: [],
            createSnake: function () {
                for (let i = 0; i < this.init_len; i++) {
                    this.cells.push({ x: i, y: 0 });
                }
            },
            drawSnake: function () {
                for (let cell of this.cells) {
                    pen.fillStyle = 'yellow';
                    pen.fillRect(cell.x * cs, cell.y * cs, cs - 1, cs - 1);
                }
            },
            updateSnake: function () {
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

                // Collision with food
                if (headX === food.x && headY === food.y) {
                    food = getRandomFood();
                    score++;
                } else {
                    this.cells.shift(); // Remove the tail
                }

                // Check boundaries
                if (nextX * cs >= canvas.width || nextY * cs >= canvas.height || nextX < 0 || nextY < 0) {
                    gameOver = true;
                    pen.fillStyle = 'red';
                    pen.font = '40px sans-serif';
                    pen.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
                    clearInterval(id);
                    return;
                }

                // Update snake's position
                this.cells.push({ x: nextX, y: nextY });
            }
        }

        function init() {
            snake.createSnake();
            food = getRandomFood();
            document.addEventListener('keydown', keyPressed);
        }

        function update() {
            if (!gameOver) {
                snake.updateSnake();
            }
        }

        function draw() {
            pen.clearRect(0, 0, canvas.width, canvas.height);
            pen.font = '40px sans-serif';
            pen.fillText(`Score ${score}`, 100, 50);
            pen.fillStyle = 'red';
            pen.fillRect(food.x * cs, food.y * cs, cs, cs);
            pen.fillStyle = 'yellow';
            snake.drawSnake();
        }

        function gameLoop() {
            draw();
            update();
        }

        function getRandomFood() {
            const foodX = Math.floor(Math.random() * (canvas.width / cs));
            const foodY = Math.floor(Math.random() * (canvas.height / cs));
            return { x: foodX, y: foodY };
        }

        function keyPressed(e) {
            if (e.key === 'ArrowDown' && snake.direction !== 'up') {
                snake.direction = 'down';
            } else if (e.key === 'ArrowLeft' && snake.direction !== 'right') {
                snake.direction = 'left';
            } else if (e.key === 'ArrowRight' && snake.direction !== 'left') {
                snake.direction = 'right';
            } else if (e.key === 'ArrowUp' && snake.direction !== 'down') {
                snake.direction = 'up';
            }
        }

        init();
        id = setInterval(gameLoop, 200);
