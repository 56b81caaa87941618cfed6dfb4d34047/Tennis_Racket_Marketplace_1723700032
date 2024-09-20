<template>
  <div class="tetris-game">
    <div class="game-info">
      <h2>Tetris Game</h2>
      <p>Score: {{ score }}</p>
      <p>Level: {{ level }}</p>
    </div>
    <div class="game-area">
      <div class="game-board">
        <div v-for="(row, rowIndex) in displayBoard" :key="rowIndex" class="row">
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell" :class="{ filled: cell }"></div>
        </div>
      </div>
      <div class="next-piece-preview">
        <h3>Next Piece:</h3>
        <div class="preview-board">
          <div v-for="(row, rowIndex) in nextPieceDisplay" :key="rowIndex" class="preview-row">
            <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="preview-cell" :class="{ filled: cell }"></div>
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
const TICK_INTERVAL = 1000;

const TETROMINOS = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];

export default {
  name: 'TetrisGame',
  setup() {
    const score = ref(0);
    const level = ref(1);
    const gameRunning = ref(false);
    const gameBoard = ref(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));

    const gameState = reactive({
      currentPiece: null,
      nextPiece: null,
      currentPosition: { x: 0, y: 0 },
      tickInterval: null,
    });

    const displayBoard = computed(() => {
      const board = gameBoard.value.map(row => [...row]);
      if (gameState.currentPiece && gameRunning.value) {
        for (let y = 0; y < gameState.currentPiece.length; y++) {
          for (let x = 0; x < gameState.currentPiece[y].length; x++) {
            if (gameState.currentPiece[y][x]) {
              const boardY = gameState.currentPosition.y + y;
              const boardX = gameState.currentPosition.x + x;
              if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                board[boardY][boardX] = 1;
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
      const offsetY = Math.floor((4 - gameState.nextPiece.length) / 2);
      const offsetX = Math.floor((4 - gameState.nextPiece[0].length) / 2);
      for (let y = 0; y < gameState.nextPiece.length; y++) {
        for (let x = 0; x < gameState.nextPiece[y].length; x++) {
          if (gameState.nextPiece[y][x]) {
            display[y + offsetY][x + offsetX] = 1;
          }
        }
      }
      return display;
    });

    const createNewPiece = () => {
      const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
      return TETROMINOS[randomIndex];
    };

    const canMoveTo = (piece, position) => {
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (piece[y][x]) {
            const newX = position.x + x;
            const newY = position.y + y;
            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && gameBoard.value[newY][newX])) {
              return false;
            }
          }
        }
      }
      return true;
    };

    const placePiece = () => {
      const { currentPiece, currentPosition } = gameState;
      for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
          if (currentPiece[y][x]) {
            gameBoard.value[currentPosition.y + y][currentPosition.x + x] = 1;
          }
        }
      }
    };

    const clearLines = () => {
      let linesCleared = 0;
      for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (gameBoard.value[y].every(cell => cell === 1)) {
          gameBoard.value.splice(y, 1);
          gameBoard.value.unshift(Array(BOARD_WIDTH).fill(0));
          linesCleared++;
          y++;
        }
      }
      score.value += linesCleared * 100 * level.value;
      level.value = Math.floor(score.value / 1000) + 1;
    };

    const startGame = () => {
      gameRunning.value = true;
      gameBoard.value = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
      score.value = 0;
      level.value = 1;
      gameState.currentPiece = createNewPiece();
      gameState.nextPiece = createNewPiece();
      gameState.currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
      gameState.tickInterval = setInterval(gameTick, TICK_INTERVAL);
    };

    const endGame = () => {
      gameRunning.value = false;
      clearInterval(gameState.tickInterval);
    };

    const gameTick = () => {
      if (!canMoveTo(gameState.currentPiece, { x: gameState.currentPosition.x, y: gameState.currentPosition.y + 1 })) {
        placePiece();
        clearLines();
        gameState.currentPiece = gameState.nextPiece;
        gameState.nextPiece = createNewPiece();
        gameState.currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
        if (!canMoveTo(gameState.currentPiece, gameState.currentPosition)) {
          endGame();
        }
      } else {
        gameState.currentPosition.y++;
      }
    };

    const movePiece = (direction) => {
      const newPosition = { ...gameState.currentPosition };
      if (direction === 'left') newPosition.x--;
      if (direction === 'right') newPosition.x++;
      if (direction === 'down') newPosition.y++;

      if (canMoveTo(gameState.currentPiece, newPosition)) {
        gameState.currentPosition = newPosition;
      } else if (direction === 'down') {
        placePiece();
        clearLines();
        gameState.currentPiece = gameState.nextPiece;
        gameState.nextPiece = createNewPiece();
        gameState.currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
        if (!canMoveTo(gameState.currentPiece, gameState.currentPosition)) {
          endGame();
        }
      }
    };

    const rotatePiece = () => {
      const rotated = gameState.currentPiece[0].map((_, index) =>
        gameState.currentPiece.map(row => row[index]).reverse()
      );
      if (canMoveTo(rotated, gameState.currentPosition)) {
        gameState.currentPiece = rotated;
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

    onMounted(() => {
      window.addEventListener('keydown', handleKeyPress);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameState.tickInterval);
    });

    return {
      score,
      level,
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
  gap: 20px;
}

.game-board {
  width: 300px;
  height: 600px;
  border: 2px solid #333;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-grow: 1;
}

.cell {
  flex-grow: 1;
  border: 1px solid #ccc;
}

.cell.filled {
  background-color: #333;
}

.next-piece-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-board {
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
}

.preview-row {
  display: flex;
  flex-grow: 1;
}

.preview-cell {
  flex-grow: 1;
  border: 1px solid #ccc;
}

.preview-cell.filled {
  background-color: #333;
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