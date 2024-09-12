<template>
  <div id="snake-game" class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div id="score-display" class="mt-4 mb-2 text-lg">Score: {{ score }}</div>
    <div class="flex mt-4 gap-2">
      <button @click="startGame" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start</button>
      <button @click="pauseGame" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Pause</button>
      <button @click="restartGame" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Restart</button>
    </div>
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
      for (let i = 1; i < this.snake.length; i++) {
        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
          clearInterval(this.gameInterval);
          alert('Game Over');
          break;
        }
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
    // this.startGame(); // Commented out to prevent auto-start on mount
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
  background-color: #f5f5f5;
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
  border: 3px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
#score-display {
  margin: 10px 0;
  font-size: 24px;
  color: #444;
}
</style>
