<template>
  <div class="tetris-game">
    <div class="game-container">
      <canvas ref="gameCanvas" width="300" height="600"></canvas>
      <div class="game-info">
        <div class="score">Score: {{ score }}</div>
        <div class="level">Level: {{ level }}</div>
        <div class="next-piece">
          <h3>Next Piece:</h3>
          <canvas ref="nextPieceCanvas" width="100" height="100"></canvas>
        </div>
        <button @click="startGame" :disabled="gameRunning">Start Game</button>
        <button @click="endGame" :disabled="!gameRunning">End Game</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;
const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

// Tetromino shapes
const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]]
];

// Reactive state
const gameCanvas = ref(null);
const nextPieceCanvas = ref(null);
const score = ref(0);
const level = ref(1);
const gameRunning = ref(false);
const gameLoop = ref(null);
const board = ref(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
const currentPiece = ref(null);
const nextPiece = ref(null);

// Game methods
const createPiece = () => {
  const shapeIndex = Math.floor(Math.random() * SHAPES.length);
  const colorIndex = Math.floor(Math.random() * COLORS.length);
  return {
    shape: SHAPES[shapeIndex],
    color: COLORS[colorIndex],
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(SHAPES[shapeIndex][0].length / 2),
    y: 0
  };
};

const drawBoard = () => {
  const ctx = gameCanvas.value.getContext('2d');
  ctx.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (board.value[y][x]) {
        ctx.fillStyle = COLORS[board.value[y][x] - 1];
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }

  if (currentPiece.value) {
    drawPiece(ctx, currentPiece.value);
  }
};

const drawPiece = (ctx, piece) => {
  ctx.fillStyle = piece.color;
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillRect((piece.x + x) * BLOCK_SIZE, (piece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = '#000';
        ctx.strokeRect((piece.x + x) * BLOCK_SIZE, (piece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    });
  });
};

const drawNextPiece = () => {
  const ctx = nextPieceCanvas.value.getContext('2d');
  ctx.clearRect(0, 0, nextPieceCanvas.value.width, nextPieceCanvas.value.height);

  if (nextPiece.value) {
    const offsetX = (100 - nextPiece.value.shape[0].length * BLOCK_SIZE) / 2;
    const offsetY = (100 - nextPiece.value.shape.length * BLOCK_SIZE) / 2;
    ctx.fillStyle = nextPiece.value.color;
    nextPiece.value.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillRect(offsetX + x * BLOCK_SIZE, offsetY + y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.strokeStyle = '#000';
          ctx.strokeRect(offsetX + x * BLOCK_SIZE, offsetY + y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      });
    });
  }
};

const moveDown = () => {
  if (canMove(currentPiece.value.x, currentPiece.value.y + 1)) {
    currentPiece.value.y++;
  } else {
    placePiece();
    clearLines();
    if (!spawnNewPiece()) {
      endGame();
    }
  }
};

const moveLeft = () => {
  if (canMove(currentPiece.value.x - 1, currentPiece.value.y)) {
    currentPiece.value.x--;
  }
};

const moveRight = () => {
  if (canMove(currentPiece.value.x + 1, currentPiece.value.y)) {
    currentPiece.value.x++;
  }
};

const rotate = () => {
  const rotated = currentPiece.value.shape[0].map((_, index) =>
    currentPiece.value.shape.map(row => row[index]).reverse()
  );

  if (canMove(currentPiece.value.x, currentPiece.value.y, rotated)) {
    currentPiece.value.shape = rotated;
  }
};

const canMove = (newX, newY, shape = currentPiece.value.shape) => {
  return shape.every((row, dy) =>
    row.every((value, dx) =>
      value === 0 || (
        newY + dy >= 0 &&
        newY + dy < BOARD_HEIGHT &&
        newX + dx >= 0 &&
        newX + dx < BOARD_WIDTH &&
        board.value[newY + dy][newX + dx] === 0
      )
    )
  );
};

const placePiece = () => {
  currentPiece.value.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board.value[currentPiece.value.y + y][currentPiece.value.x + x] = COLORS.indexOf(currentPiece.value.color) + 1;
      }
    });
  });
};

const clearLines = () => {
  let linesCleared = 0;
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board.value[y].every(cell => cell !== 0)) {
      board.value.splice(y, 1);
      board.value.unshift(Array(BOARD_WIDTH).fill(0));
      linesCleared++;
      y++;
    }
  }
  if (linesCleared > 0) {
    score.value += linesCleared * linesCleared * 100;
    level.value = Math.floor(score.value / 1000) + 1;
  }
};

const spawnNewPiece = () => {
  currentPiece.value = nextPiece.value || createPiece();
  nextPiece.value = createPiece();
  drawNextPiece();
  return canMove(currentPiece.value.x, currentPiece.value.y);
};

const startGame = () => {
  if (gameRunning.value) return;
  gameRunning.value = true;
  score.value = 0;
  level.value = 1;
  board.value = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
  spawnNewPiece();
  gameLoop.value = setInterval(() => {
    moveDown();
    drawBoard();
  }, 1000 / level.value);
};

const endGame = () => {
  gameRunning.value = false;
  clearInterval(gameLoop.value);
};

const handleKeydown = (e) => {
  if (!gameRunning.value) return;
  switch (e.key.toLowerCase()) {
    case 'w':
      rotate();
      break;
    case 'a':
      moveLeft();
      break;
    case 's':
      moveDown();
      break;
    case 'd':
      moveRight();
      break;
  }
  drawBoard();
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  drawBoard();
  drawNextPiece();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  clearInterval(gameLoop.value);
});
</script>

<style scoped>
.tetris-game {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.game-container {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

canvas {
  border: 2px solid #333;
  border-radius: 5px;
}

.game-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.score, .level {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.next-piece {
  margin-bottom: 20px;
}

.next-piece h3 {
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>