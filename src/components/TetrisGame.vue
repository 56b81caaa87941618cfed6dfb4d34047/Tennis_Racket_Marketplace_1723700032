<template>
  <div class="tetris-game">
    <div class="game-container">
      <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      <div class="game-info">
        <div class="score">Score: {{ score }}</div>
        <div class="next-piece">
          <h3>Next Piece:</h3>
          <canvas ref="nextPieceCanvas" width="100" height="100"></canvas>
        </div>
        <button @click="startGame" :disabled="gameRunning" class="start-btn">Start Game</button>
        <button @click="endGame" :disabled="!gameRunning" class="end-btn">End Game</button>
      </div>
    </div>
    <div v-if="gameOver" class="game-over">
      <h2>Game Over</h2>
      <p>Your score: {{ score }}</p>
      <button @click="resetGame" class="reset-btn">Play Again</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gameCanvas = ref(null);
const nextPieceCanvas = ref(null);
const canvasWidth = 300;
const canvasHeight = 600;
const blockSize = 30;
const boardWidth = 10;
const boardHeight = 20;

const score = ref(0);
const gameRunning = ref(false);
const gameOver = ref(false);

let board = [];
let currentPiece = null;
let nextPiece = null;
let gameLoop = null;

const pieces = [
  { shape: [[1, 1, 1, 1]], color: '#00FFFF' }, // I
  { shape: [[1, 1, 1], [0, 1, 0]], color: '#FFA500' }, // T
  { shape: [[1, 1, 1], [1, 0, 0]], color: '#0000FF' }, // L
  { shape: [[1, 1, 1], [0, 0, 1]], color: '#FFD700' }, // J
  { shape: [[1, 1], [1, 1]], color: '#FFFF00' }, // O
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#00FF00' }, // S
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#FF0000' } // Z
];

function createBoard() {
  board = Array(boardHeight).fill().map(() => Array(boardWidth).fill(0));
}

function drawBoard(ctx) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      if (board[y][x]) {
        ctx.fillStyle = board[y][x];
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
}

function createPiece() {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  const piece = pieces[pieceIndex];
  return {
    shape: piece.shape,
    color: piece.color,
    x: Math.floor(boardWidth / 2) - Math.floor(piece.shape[0].length / 2),
    y: 0
  };
}

function drawPiece(ctx, piece, offsetX = 0, offsetY = 0) {
  ctx.fillStyle = piece.color;
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillRect((piece.x + x + offsetX) * blockSize, (piece.y + y + offsetY) * blockSize, blockSize, blockSize);
        ctx.strokeStyle = '#000';
        ctx.strokeRect((piece.x + x + offsetX) * blockSize, (piece.y + y + offsetY) * blockSize, blockSize, blockSize);
      }
    });
  });
}

function canMove(piece, moveX, moveY) {
  return piece.shape.every((row, y) => 
    row.every((value, x) => 
      !value || 
      (
        piece.x + x + moveX >= 0 &&
        piece.x + x + moveX < boardWidth &&
        piece.y + y + moveY < boardHeight &&
        !board[piece.y + y + moveY]?.[piece.x + x + moveX]
      )
    )
  );
}

function merge(piece) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[piece.y + y][piece.x + x] = piece.color;
      }
    });
  });
}

function rotate(piece) {
  const newShape = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  const rotated = { ...piece, shape: newShape };
  if (canMove(rotated, 0, 0)) {
    return rotated;
  }
  return piece;
}

function clearLines() {
  let linesCleared = 0;
  for (let y = boardHeight - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(boardWidth).fill(0));
      linesCleared++;
      y++;
    }
  }
  if (linesCleared > 0) {
    score.value += linesCleared * 100;
  }
}

function update() {
  if (canMove(currentPiece, 0, 1)) {
    currentPiece.y++;
  } else {
    merge(currentPiece);
    clearLines();
    currentPiece = nextPiece;
    nextPiece = createPiece();
    if (!canMove(currentPiece, 0, 0)) {
      endGame();
    }
  }
}

function draw() {
  const ctx = gameCanvas.value.getContext('2d');
  drawBoard(ctx);
  drawPiece(ctx, currentPiece);

  const nextCtx = nextPieceCanvas.value.getContext('2d');
  nextCtx.clearRect(0, 0, 100, 100);
  drawPiece(nextCtx, nextPiece, 1, 1);
}

function gameStep() {
  update();
  draw();
}

function startGame() {
  if (gameRunning.value) return;
  createBoard();
  currentPiece = createPiece();
  nextPiece = createPiece();
  score.value = 0;
  gameRunning.value = true;
  gameOver.value = false;
  gameLoop = setInterval(gameStep, 500);
}

function endGame() {
  if (!gameRunning.value) return;
  clearInterval(gameLoop);
  gameRunning.value = false;
  gameOver.value = true;
}

function resetGame() {
  endGame();
  startGame();
}

function handleKeydown(e) {
  if (!gameRunning.value) return;

  switch (e.key) {
    case 'a':
      if (canMove(currentPiece, -1, 0)) currentPiece.x--;
      break;
    case 'd':
      if (canMove(currentPiece, 1, 0)) currentPiece.x++;
      break;
    case 's':
      if (canMove(currentPiece, 0, 1)) currentPiece.y++;
      break;
    case 'w':
      currentPiece = rotate(currentPiece);
      break;
  }
  draw();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  draw();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  clearInterval(gameLoop);
});
</script>

<style scoped>
.tetris-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.game-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

canvas {
  border: 2px solid #333;
  background-color: #f0f0f0;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.score, .next-piece h3 {
  font-size: 1.2em;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.start-btn {
  background-color: #4CAF50;
  color: white;
}

.start-btn:hover {
  background-color: #45a049;
}

.end-btn {
  background-color: #f44336;
  color: white;
}

.end-btn:hover {
  background-color: #da190b;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.reset-btn {
  background-color: #008CBA;
  color: white;
  margin-top: 10px;
}

.reset-btn:hover {
  background-color: #007B9A;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .game-container {
    flex-direction: column;
    align-items: center;
  }

  canvas {
    max-width: 100%;
    height: auto;
  }
}
</style>