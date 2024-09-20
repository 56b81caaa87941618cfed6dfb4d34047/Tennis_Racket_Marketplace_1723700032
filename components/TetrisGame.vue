
<template>
  <div class="tetris-game">
    <div class="game-info">
      <h2>Tetris Game</h2>
      <p>Score: {{ score }}</p>
      <p>High Score: {{ highScore }}</p>
      <p>Level: {{ level }}</p>
      <p>Lines: {{ lines }}</p>
    </div>
    <div class="game-area">
      <div class="game-board">
        <div v-for="(row, rowIndex) in displayBoard" :key="rowIndex" class="row">
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['cell', { filled: cell !== 0 }]" :style="{ backgroundColor: cell !== 0 ? cell : 'transparent' }"></div>
        </div>
      </div>
      <div class="next-piece">
        <h3>Next Piece:</h3>
        <div class="next-piece-board">
          <div v-for="(row, rowIndex) in nextPieceDisplay" :key="rowIndex" class="row">
            <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['cell', { filled: cell !== 0 }]" :style="{ backgroundColor: cell !== 0 ? cell : 'transparent' }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-controls">
      <button @click="startGame" :disabled="gameRunning">Start Game</button>
      <button @click="endGame" :disabled="!gameRunning">End Game</button>
    </div>
    <div class="game-instructions">
      <p>Controls: W (Rotate), A (Left), S (Down), D (Right)</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000; // 1 second
const LEVEL_UP_LINES = 10;
const SPEED_INCREASE = 0.8; // 20% faster per level

// Define colors for each piece type
const COLORS = {
  I: '#00FFFF', // Cyan
  J: '#0000FF', // Blue
  L: '#FFA500', // Orange
  O: '#FFFF00', // Yellow
  S: '#00FF00', // Green
  T: '#800080', // Purple
  Z: '#FF0000', // Red
};

// Define Tetris pieces with colors
const PIECES = [
  { shape: [[1, 1, 1, 1]], color: COLORS.I }, // I
  { shape: [[1, 0, 0], [1, 1, 1]], color: COLORS.J }, // J
  { shape: [[0, 0, 1], [1, 1, 1]], color: COLORS.L }, // L
  { shape: [[1, 1], [1, 1]], color: COLORS.O }, // O
  { shape: [[0, 1, 1], [1, 1, 0]], color: COLORS.S }, // S
  { shape: [[0, 1, 0], [1, 1, 1]], color: COLORS.T }, // T
  { shape: [[1, 1, 0], [0, 1, 1]], color: COLORS.Z }, // Z
];

export default {
  name: 'TetrisGame',
  setup() {
    const score = ref(0);
    const highScore = ref(0);
    const level = ref(1);
    const lines = ref(0);
    const gameRunning = ref(false);
    const gameBoard = reactive(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
    let gameLoopInterval = null;
    let currentSpeed = INITIAL_SPEED;

    // Game state
    const gameState = reactive({
      currentPiece: null,
      currentPiecePosition: { x: 0, y: 0 },
      nextPiece: null,
    });

    const displayBoard = computed(() => {
      const board = gameBoard.map(row => [...row]);
      if (gameState.currentPiece) {
        for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
          for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
            if (gameState.currentPiece.shape[y][x]) {
              const boardY = gameState.currentPiecePosition.y + y;
              const boardX = gameState.currentPiecePosition.x + x;
              if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                board[boardY][boardX] = gameState.currentPiece.color;
              }
            }
          }
        }
      }
      return board;
    });

    const nextPieceDisplay = computed(() => {
      if (!gameState.nextPiece) return Array(4).fill().map(() => Array(4).fill(0));
      const display = Array(4).fill().map(() => Array(4).fill(0));
      const piece = gameState.nextPiece.shape;
      const offsetY = Math.floor((4 - piece.length) / 2);
      const offsetX = Math.floor((4 - piece[0].length) / 2);
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (piece[y][x]) {
            display[y + offsetY][x + offsetX] = gameState.nextPiece.color;
          }
        }
      }
      return display;
    });

    const startGame = () => {
      gameRunning.value = true;
      resetGame();
      spawnNewPiece();
      gameLoopInterval = setInterval(gameLoop, currentSpeed);
    };

    const endGame = () => {
      gameRunning.value = false;
      clearInterval(gameLoopInterval);
      updateHighScore();
    };

    const resetGame = () => {
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          gameBoard[y][x] = 0;
        }
      }
      score.value = 0;
      level.value = 1;
      lines.value = 0;
      currentSpeed = INITIAL_SPEED;
    };

    const updateHighScore = () => {
      if (score.value > highScore.value) {
        highScore.value = score.value;
        localStorage.setItem('tetrisHighScore', highScore.value);
      }
    };

    const loadHighScore = () => {
      const savedHighScore = localStorage.getItem('tetrisHighScore');
      if (savedHighScore) {
        highScore.value = parseInt(savedHighScore, 10);
      }
    };

    const getRandomPiece = () => {
      const randomIndex = Math.floor(Math.random() * PIECES.length);
      return PIECES[randomIndex];
    };

    const spawnNewPiece = () => {
      gameState.currentPiece = gameState.nextPiece || getRandomPiece();
      gameState.nextPiece = getRandomPiece();
      gameState.currentPiecePosition = {
        x: Math.floor((BOARD_WIDTH - gameState.currentPiece.shape[0].length) / 2),
        y: 0,
      };

      if (!isValidMove(gameState.currentPiece.shape, gameState.currentPiecePosition)) {
        endGame();
      }
    };

    const isValidMove = (pieceShape, position) => {
      for (let y = 0; y < pieceShape.length; y++) {
        for (let x = 0; x < pieceShape[y].length; x++) {
          if (pieceShape[y][x]) {
            const newX = position.x + x;
            const newY = position.y + y;
            if (
              newX < 0 ||
              newX >= BOARD_WIDTH ||
              newY >= BOARD_HEIGHT ||
              (newY >= 0 && gameBoard[newY][newX])
            ) {
              return false;
            }
          }
        }
      }
      return true;
    };

    const gameLoop = () => {
      if (!gameRunning.value) return;

      const newPosition = {
        ...gameState.currentPiecePosition,
        y: gameState.currentPiecePosition.y + 1,
      };

      if (isValidMove(gameState.currentPiece.shape, newPosition)) {
        gameState.currentPiecePosition = newPosition;
      } else {
        mergePieceWithBoard();
        clearLines();
        spawnNewPiece();
      }
    };

    const mergePieceWithBoard = () => {
      for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
        for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
          if (gameState.currentPiece.shape[y][x]) {
            const boardY = gameState.currentPiecePosition.y + y;
            const boardX = gameState.currentPiecePosition.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              gameBoard[boardY][boardX] = gameState.currentPiece.color;
            }
          }
        }
      }
    };

    const clearLines = () => {
      let linesCleared = 0;
      for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (gameBoard[y].every(cell => cell !== 0)) {
          // Remove the line
          gameBoard.splice(y, 1);
          // Add a new empty line at the top
          gameBoard.unshift(Array(BOARD_WIDTH).fill(0));
          linesCleared++;
          y++; // Check the same row again, as it now contains the row from above
        }
      }
      if (linesCleared > 0) {
        updateScore(linesCleared);
      }
    };

    const updateScore = (linesCleared) => {
      const linePoints = [40, 100, 300, 1200]; // Points for 1, 2, 3, and 4 lines
      score.value += linePoints[linesCleared - 1] * level.value;
      lines.value += linesCleared;

      if (lines.value >= LEVEL_UP_LINES * level.value) {
        levelUp();
      }
    };

    const levelUp = () => {
      level.value++;
      currentSpeed *= SPEED_INCREASE;
      clearInterval(gameLoopInterval);
      gameLoopInterval = setInterval(gameLoop, currentSpeed);
    };

    const movePiece = (direction) => {
      if (!gameState.currentPiece) return;

      let newPosition = { ...gameState.currentPiecePosition };

      switch (direction) {
        case 'left':
          newPosition.x -= 1;
          break;
        case 'right':
          newPosition.x += 1;
          break;
        case 'down':
          newPosition.y += 1;
          break;
      }

      if (isValidMove(gameState.currentPiece.shape, newPosition)) {
        gameState.currentPiecePosition = newPosition;
      } else if (direction === 'down') {
        mergePieceWithBoard();
        clearLines();
        spawnNewPiece();
      }
    };

    const rotatePiece = () => {
      if (!gameState.currentPiece) return;

      const rotatedShape = [];
      for (let y = 0; y < gameState.currentPiece.shape[0].length; y++) {
        const newRow = [];
        for (let x = gameState.currentPiece.shape.length - 1; x >= 0; x--) {
          newRow.push(gameState.currentPiece.shape[x][y]);
        }
        rotatedShape.push(newRow);
      }

      if (isValidMove(rotatedShape, gameState.currentPiecePosition)) {
        gameState.currentPiece.shape = rotatedShape;
      }
    };

    const handleKeyPress = (event) => {
      if (!gameRunning.value) return;

      switch (event.key.toLowerCase()) {
        case 'w':
          rotatePiece();
          break;
        case 'a':
          movePiece('left');
          break;
        case 's':
          movePiece('down');
          break;
        case 'd':
          movePiece('right');
          break;
      }
    };

    // Lifecycle hooks
    onMounted(() => {
      window.addEventListener('keydown', handleKeyPress);
      loadHighScore();
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoopInterval);
    });

    return {
      score,
      highScore,
      level,
      lines,
      gameRunning,
      displayBoard,
      nextPieceDisplay,
      startGame,
      endGame,
    };
  },
};
</script>

<style scoped>
.tetris-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.game-info {
  margin-bottom: 20px;
  text-align: center;
}

.game-area {
  display: flex;
  align-items: flex-start;
}

.game-board {
  width: 300px;
  height: 600px;
  border: 2px solid #333;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
}

.next-piece {
  margin-left: 20px;
  text-align: center;
}

.next-piece-board {
  width: 120px;
  height: 120px;
  border: 2px solid #333;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}

.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
}

.next-piece-board .cell {
  width: 30px;
  height: 30px;
}

.cell.filled {
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.game-controls {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.game-instructions {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
</style>
