<template>
  <div id="snake-game">
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div id="score-display">Score: {{ score }}</div>
    <button @click="startGame">Start</button>
    <button @click="pauseGame">Pause</button>
    <button @click="restartGame">Restart</button>
  </div>
</template>

<script>
export default {
  name: 'SnakeGameComponent',
  data() {
    return {
      gameInterval: null,
      snake: [{ x: 10, y: 10 }],
      food: { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) },
      direction: 'RIGHT',
      gridSize: 20,
      canvas: null,
      context: null,
      score: 0,
    };
  },
  methods: {
    startGame() {
      window.addEventListener('keydown', this.changeDirection);
      this.canvas = document.getElementById('gameCanvas');
      this.context = this.canvas.getContext('2d');
      this.gameInterval = setInterval(this.gameLoop, 100);
    },
    changeDirection(event) {
      switch(event.keyCode) {
        case 37:
          if(this.direction !== 'RIGHT') this.direction = 'LEFT';
          break;
        case 38:
          if(this.direction !== 'DOWN') this.direction = 'UP';
          break;
        case 39:
          if(this.direction !== 'LEFT') this.direction = 'RIGHT';
          break;
        case 40:
          if(this.direction !== 'UP') this.direction = 'DOWN';
          break;
      }
    },
    pauseGame() {
      clearInterval(this.gameInterval);
    },
    restartGame() {
      clearInterval(this.gameInterval);
      this.snake = [{ x: 10, y: 10 }];
      this.food = { x: Math.floor(Math.random() * this.gridSize), y: Math.floor(Math.random() * this.gridSize) };
      this.direction = 'RIGHT';
      this.score = 0;
      this.startGame();
    },
   gameLoop() {
      this.updateSnakePosition();
      this.checkCollision();
      this.drawGame();
    },
    updateSnakePosition() {
      const head = { ...this.snake[0] };
      if (this.direction === 'RIGHT') head.x += 1;
      if (this.direction === 'LEFT') head.x -= 1;
      if (this.direction === 'UP') head.y -= 1;
      if (this.direction === 'DOWN') head.y += 1;
      this.snake.unshift(head);
      this.snake.pop(); // remove the tail
    },
    checkCollision() {
      const head = this.snake[0];
      if (head.x === this.food.x && head.y === this.food.y) {
        this.snake.push(this.food);
        this.food = { x: Math.floor(Math.random() * this.gridSize), y: Math.floor(Math.random() * this.gridSize) };
        this.score += 10;
      }
      if (head.x >= this.gridSize || head.y >= this.gridSize || head.x < 0 || head.y < 0) {
        clearInterval(this.gameInterval);
        alert('Game Over');
      }
    },
    drawGame() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = 'green';
      this.snake.forEach(part => {
        this.context.fillRect(part.x * this.gridSize, part.y * this.gridSize, this.gridSize, this.gridSize);
      });
      this.context.fillStyle = 'red';
      this.context.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
    },
  },
  mounted() {
    this.startGame();
  }
};
</script>

<style scoped>
#snake-game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #0056b3;
}
canvas {
  border: 2px solid #000;
}
#score-display {
  margin: 10px 0;
  font-size: 24px;
  color: #333;
}
</style>