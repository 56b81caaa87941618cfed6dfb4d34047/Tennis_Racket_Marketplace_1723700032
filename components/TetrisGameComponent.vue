<template>
  <div class="tetris-game flex flex-col items-center justify-center p-5 max-w-lg bg-gray-100 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-5">Tetris Game</h2>
    <div class="score-display mb-4 text-lg">Score: {{ score }}</div>
    <div class="tetris-grid">
      <div v-for="(row, rowIndex) in renderedGrid" :key="rowIndex" class="tetris-row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" :class="['tetris-cell', cell ? 'filled' : '']"></div>
      </div>
    </div>
    <div class="controls mt-4 flex gap-2">
      <button @click="startGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start</button>
      <button @click="moveLeft" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Left</button>
      <button @click="moveRight" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Right</button>
      <button @click="rotate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Rotate</button>
      <button @click="drop" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Drop</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TetrisGameComponent',
  data() {
    return {
      grid: Array(20).fill().map(() => Array(10).fill(0)),
      currentPiece: null,
      intervalId: null,
      score: 0,
      pieces: [
        [[1, 1, 1, 1]], // I
        [[1, 1], [1, 1]], // O
        [[0, 1, 0], [1, 1, 1]], // T
        [[1, 0, 0], [1, 1, 1]], // L
        [[0, 0, 1], [1, 1, 1]], // J
        [[1, 1, 0], [0, 1, 1]], // S
        [[0, 1, 1], [1, 1, 0]], // Z
      ],
      currentPosition: { x: 4, y: 0 },
      currentRotation: 0,
    };
  },
  computed: {
    renderedGrid() {
      let clonedGrid = this.grid.map(row => row.slice());
      if (this.currentPiece) {
        const shape = this.getRotatedPiece();
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
              const gridX = this.currentPosition.x + x;
              const gridY = this.currentPosition.y + y;
              if (gridY >= 0 && gridY < clonedGrid.length && gridX >= 0 && gridX < clonedGrid[0].length) {
                clonedGrid[gridY][gridX] = 1;
              }
            }
          }
        }
      }
      return clonedGrid;
    },
  },
  methods: {
    startGame() {
      console.log('Game started');
      this.resetGame();
      this.spawnPiece();
      this.intervalId = setInterval(this.gameLoop, 500);
    },
    resetGame() {
      console.log('Game reset');
      this.grid = Array(20).fill().map(() => Array(10).fill(0));
      this.currentPiece = null;
      this.currentPosition = { x: 4, y: 0 };
      this.currentRotation = 0;
      this.score = 0;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    moveLeft() {
      if (this.canMove(-1, 0)) {
        this.currentPosition.x -= 1;
      }
    },
    moveRight() {
      if (this.canMove(1, 0)) {
        this.currentPosition.x += 1;
      }
    },
    rotate() {
      const newRotation = (this.currentRotation + 1) % 4;
      if (this.canMove(0, 0, newRotation)) {
        this.currentRotation = newRotation;
      }
    },
    drop() {
      while(this.canMove(0, 1)) {
        this.currentPosition.y += 1;
      }
      this.mergePiece();
      this.spawnPiece();
    },
    gameLoop() {
      console.log('Game loop tick');
      if (!this.canMove(0, 1)) {
        this.mergePiece();
        this.spawnPiece();
      } else {
        this.currentPosition.y += 1;
      }
    },
    spawnPiece() {
      console.log('Spawning new piece');
      const randomIndex = Math.floor(Math.random() * this.pieces.length);
      this.currentPiece = this.pieces[randomIndex];
      this.currentPosition = { x: 4, y: 0 };
      this.currentRotation = 0;
      if (!this.canMove(0, 0)) {
        alert('Game Over');
        this.resetGame();
      }
    },
    canMove(deltaX, deltaY, rotation = this.currentRotation) {
      const shape = this.getRotatedPiece(rotation);
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const newX = this.currentPosition.x + x + deltaX;
            const newY = this.currentPosition.y + y + deltaY;
            if (
              newX < 0 ||
              newX >= this.grid[0].length ||
              newY < 0 ||
              newY >= this.grid.length ||
              (newY >= 0 && this.grid[newY][newX])
            ) {
              return false;
            }
          }
        }
      }
      // Wall kick logic: adjust position for rotation
      if (deltaX === 0 && rotation !== this.currentRotation) {
        return this.canMove(-1, 0, rotation) || this.canMove(1, 0, rotation);
      }
      return true;
    },
    getRotatedPiece(rotation = this.currentRotation) {
      const shape = this.currentPiece;
      switch(rotation) {
        case 1:
          return shape[0].map((val, index) => shape.map(row => row[index]).reverse());
        case 2:
          return shape.slice().reverse().map(row => row.slice().reverse());
        case 3:
          return shape[0].map((val, index) => shape.map(row => row[shape[0].length - 1 - index]));
        default:
          return shape;
      }
    },
    mergePiece() {
      const shape = this.getRotatedPiece();
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            this.grid[this.currentPosition.y + y][this.currentPosition.x + x] = 1;
          }
        }
      }
      console.log('Grid after merging piece:', this.grid);
      this.clearLines();
    },
    clearLines() {
      const rowsToRemove = [];
      for (let y = 0; y < this.grid.length; y++) {
        if (this.grid[y].every(cell => cell !== 0)) {
          rowsToRemove.push(y);
        }
      }

      for (const rowIndex of rowsToRemove) {
        this.grid.splice(rowIndex, 1);
        this.grid.unshift(Array(10).fill(0));
      }
      this.score += rowsToRemove.length * 100;
      console.log('Lines cleared:', rowsToRemove.length);
      console.log('Current score:', this.score);
    },
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>

<style scoped>
.tetris-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.tetris-grid {
  display: grid;
  grid-template-rows: repeat(20, 20px);
  grid-template-columns: repeat(10, 20px);
  gap: 1px;
  background-color: #444;
  margin-bottom: 15px;
}
.score-display {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
}
.tetris-row {
  display: contents;
}
.tetris-cell {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 2px;
}
.tetris-cell.filled {
  background-color: #3498db;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
}
.controls {
  margin-top: 20px;
}
.controls button {
  margin: 0 5px;
  padding: 8px 15px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.controls button:hover {
  background-color: #2980b9;
}
</style>