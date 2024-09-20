<template>
  <div class="tetris-game">
    <div class="game-info">
      <h2>Tetris Game</h2>
      <p>Score: {{ score }}</p>
      <p>Level: {{ level }}</p>
    </div>
    <div class="game-board">
      <div v-for="(row, rowIndex) in gameBoard" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['cell', { filled: cell }]"></div>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TICK_INTERVAL = 1000;

const TETROMINOS = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]]
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
      currentPosition: { x: 0, y: 0 },
      tickInterval: null
    });

    const createNewPiece = () => {
      const pieceIndex = Math.floor(Math.random() * TETROMINOS.length);
      gameState.currentPiece = TETROMINOS[pieceIndex];
      gameState.currentPosition = {
        x: Math.floor((BOARD_WIDTH - gameState.currentPiece[0].length) / 2),
        y: 0
      };
    };

    const drawPiece = () => {
      const newBoard = gameBoard.value.map(row => [...row]);
      gameState.currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = y + gameState.currentPosition.y;
            const boardX = x + gameState.currentPosition.x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              newBoard[boardY][boardX] = value;
            }
          }
        });
      });
      gameBoard.value = newBoard;
    };

    const clearPiece = () => {
      gameState.currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = y + gameState.currentPosition.y;
            const boardX = x + gameState.currentPosition.x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              gameBoard.value[boardY][boardX] = 0;
            }
          }
        });
      });
    };

    const isValidMove = (piece, position) => {
      return piece.every((row, y) => 
        row.every((value, x) => {
          const boardY = y + position.y;
          const boardX = x + position.x;
          return (
            value === 0 ||
            (boardY >= 0 &&
             boardY < BOARD_HEIGHT &&
             boardX >= 0 &&
             boardX < BOARD_WIDTH &&
             gameBoard.value[boardY][boardX] === 0)
          );
        })
      );
    };

    const movePiece = (direction) => {
      clearPiece();
      const newPosition = { ...gameState.currentPosition };
      if (direction === 'left') newPosition.x -= 1;
      if (direction === 'right') newPosition.x += 1;
      if (direction === 'down') newPosition.y += 1;

      if (isValidMove(gameState.currentPiece, newPosition)) {
        gameState.currentPosition = newPosition;
        drawPiece();
      } else if (direction === 'down') {
        drawPiece();
        lockPiece();
      } else {
        drawPiece();
      }
    };

    const rotatePiece = () => {
      clearPiece();
      const rotatedPiece = gameState.currentPiece[0].map((_, index) =>
        gameState.currentPiece.map(row => row[index]).reverse()
      );
      if (isValidMove(rotatedPiece, gameState.currentPosition)) {
        gameState.currentPiece = rotatedPiece;
      }
      drawPiece();
    };

    const lockPiece = () => {
      clearPiece();
      gameState.currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = y + gameState.currentPosition.y;
            const boardX = x + gameState.currentPosition.x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              gameBoard.value[boardY][boardX] = value;
            }
          }
        });
      });
      clearLines();
      createNewPiece();
      if (!isValidMove(gameState.currentPiece, gameState.currentPosition)) {
        endGame();
      }
    };

    const clearLines = () => {
      let linesCleared = 0;
      gameBoard.value = gameBoard.value.filter(row => {
        if (row.every(cell => cell === 1)) {
          linesCleared++;
          return false;
        }
        return true;
      });
      while (gameBoard.value.length < BOARD_HEIGHT) {
        gameBoard.value.unshift(Array(BOARD_WIDTH).fill(0));
      }
      updateScore(linesCleared);
    };

    const updateScore = (linesCleared) => {
      const points = [0, 40, 100, 300, 1200];
      score.value += points[linesCleared] * level.value;
      if (score.value > level.value * 1000) {
        level.value++;
      }
    };

    const startGame = () => {
      gameRunning.value = true;
      score.value = 0;
      level.value = 1;
      gameBoard.value = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
      createNewPiece();
      gameState.tickInterval = setInterval(gameTick, TICK_INTERVAL);
    };

    const endGame = () => {
      gameRunning.value = false;
      clearInterval(gameState.tickInterval);
    };

    const gameTick = () => {
      movePiece('down');
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
      gameBoard,
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
  flex: 1;
}

.cell {
  flex: 1;
  border: 1px solid #ccc;
}

.cell.filled {
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