<template>
  <div class="tetris-game">
    <canvas ref="canvas" width="300" height="600" class="tetris-canvas"></canvas>
    <div class="controls">
      <button @click="startGame">Start</button>
      <button @click="endGame">End</button>
    </div>
    <div class="info">
      <div>Score: {{ score }}</div>
      <div>Next Piece:</div>
      <canvas ref="nextCanvas" width="100" height="100"></canvas>
    </div>
    <div v-if="gameOver" class="game-over">
      Game Over!
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

// Define tetromino shapes and colors
const tetrominos = [
  { shape: [[1, 1, 1, 1]], color: 'cyan' },
  { shape: [[1, 1, 1], [0, 1, 0]], color: 'blue' },
  { shape: [[1, 1, 0], [0, 1, 1]], color: 'orange' },
  { shape: [[0, 1, 1], [1, 1, 0]], color: 'yellow' },
  { shape: [[1, 0, 0], [1, 1, 1]], color: 'green' },
  { shape: [[0, 0, 1], [1, 1, 1]], color: 'red' },
  { shape: [[1, 1], [1, 1]], color: 'purple' }
];

const canvas = ref(null);
const nextCanvas = ref(null);
const context = ref(null);
const nextContext = ref(null);

const score = ref(0);
const gameStarted = ref(false);
const gameOver = ref(false);

const currentPiece = reactive({ shape: [], color: '', x: 0, y: 0 });
const nextPiece = reactive({ shape: [], color: '' });

const board = ref([...Array(20)].map(() => Array(10).fill(0)));

function startGame() {
  gameStarted.value = true;
  gameOver.value = false;
  score.value = 0;
  resetBoard();
  spawnPiece();
  gameLoop();
}

function endGame() {
  gameStarted.value = false;
  gameOver.value = true;
}

function resetBoard() {
  board.value = board.value.map(row => row.fill(0));
}

function spawnPiece() {
  // If currentPiece is empty, it means we're starting a new game
  const randomPiece = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  Object.assign(currentPiece, { shape: randomPiece.shape, color: randomPiece.color, x: 3, y: 0 });

  // If the previous line didn't set it to zero, it's because of a continuing game
  // And we take the next piece generated
  if (currentPiece.shape.length !== 0) {
    Object.assign(currentPiece, nextPiece);
  } else {
    Object.assign(currentPiece, randomPiece);
  }

  const randomNextPiece = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  nextPiece.shape = randomNextPiece.shape;
  nextPiece.color = randomNextPiece.color;

  drawNextPiece();

  if (!isValidMove(currentPiece.shape, currentPiece.x, currentPiece.y)) {
    endGame();
  }
}

function isValidMove(shape, x, y) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] !== 0) {
        const newX = x + c;
        const newY = y + r;
        if (newX < 0 || newX >= board.value[0].length || newY >= board.value.length || (newY >= 0 && board.value[newY][newX] !== 0)) {
          return false;
        }
      }
    }
  }
  return true;
}

function rotatePiece() {
  const shape = currentPiece.shape[0].map((val, index) => currentPiece.shape.map(row => row[index]).reverse());
  if (isValidMove(shape, currentPiece.x, currentPiece.y)) {
    currentPiece.shape = shape;
  }
}

function dropPiece() {
  if (!movePiece(0, 1)) {
    mergePiece();
    clearLines();
    spawnPiece();
  }
}

function movePiece(deltaX, deltaY) {
  const x = currentPiece.x + deltaX;
  const y = currentPiece.y + deltaY;
  if (isValidMove(currentPiece.shape, x, y)) {
    currentPiece.x = x;
    currentPiece.y = y;
    return true;
  }
  return false;
}

function mergePiece() {
  currentPiece.shape.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value !== 0) {
        board.value[currentPiece.y + r][currentPiece.x + c] = currentPiece.color;
      }
    });
  });
}

function clearLines() {
  let linesCleared = 0;
  for (let r = board.value.length - 1; r >= 0; r--) {
    if (board.value[r].every(value => value !== 0)) {
      board.value.splice(r, 1);
      board.value.unshift(Array(10).fill(0));
      linesCleared++;
    }
  }
  score.value += linesCleared * 100;
}

function handleKeyDown(event) {
  if (!gameStarted.value) return;
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      rotatePiece();
      break;
    case 'ArrowLeft':
    case 'a':
      movePiece(-1, 0);
      break;
    case 'ArrowDown':
    case 's':
      dropPiece();
      break;
    case 'ArrowRight':
    case 'd':
      movePiece(1, 0);
      break;
  }
  draw();
}

function gameLoop() {
  if (!gameStarted.value) return;
  dropPiece();
  draw();
  if (!gameOver.value) {
    setTimeout(gameLoop, 500); // Control speed
  }
}

function drawNextPiece() {
  nextContext.value.clearRect(0, 0, nextCanvas.value.width, nextCanvas.value.height);
  nextPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        nextContext.value.fillStyle = nextPiece.color;
        nextContext.value.fillRect(x * 10, y * 10, 10, 10);
      }
    });
  });
}

function draw() {
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  drawMatrix(board.value, { x: 0, y: 0 });
  drawMatrix(currentPiece.shape, currentPiece);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.value.fillStyle = typeof value === 'string' ? value : currentPiece.color;
        context.value.fillRect((x + offset.x) * 30, (y + offset.y) * 30, 30, 30);
        context.value.strokeStyle = '#000';
        context.value.strokeRect((x + offset.x) * 30, (y + offset.y) * 30, 30, 30);
      }
    });
  });
}

onMounted(() => {
  context.value = canvas.value.getContext('2d');
  nextContext.value = nextCanvas.value.getContext('2d');
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.tetris-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tetris-canvas {
  border: 1px solid #000;
  background-color: #f0f0f0;
}
.controls {
  margin-top: 10px;
}
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
.info {
  margin-top: 10px;
}
.game-over {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
