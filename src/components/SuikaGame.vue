
<template>
  <div class="suika-game">
    <div class="game-header">
      <GameStatus
        :score="score"
        :highScore="highScore"
        :isGameOver="gameOver"
        @restart="startNewGame"
      />
      <FruitPreview :nextFruit="nextFruit" />
    </div>
    <div ref="gameContainer" class="game-container" @mousemove="updateMousePosition"></div>
    <button v-if="!gameOver" @click="startNewGame" class="new-game-btn">New Game</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Matter from 'matter-js';
import GameStatus from './GameStatus.vue';
import FruitPreview from './FruitPreview.vue';

const gameContainer = ref(null);
const score = ref(0);
const highScore = ref(0);
const nextFruit = ref(null);
const fruits = ref([]);
const gameOver = ref(false);
const mousePosition = ref({ x: 0, y: 0 });

const { Engine, Render, World, Bodies, Events, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
let render;
let world;
let mouseConstraint;
let ghostFruit;

const FRUITS = [
  { name: 'Cherry', radius: 15, color: '#ff0000', points: 1 },
  { name: 'Strawberry', radius: 20, color: '#ff6347', points: 2 },
  { name: 'Grape', radius: 25, color: '#800080', points: 3 },
  { name: 'Dekopon', radius: 30, color: '#ffa500', points: 4 },
  { name: 'Orange', radius: 35, color: '#ffa500', points: 5 },
  { name: 'Apple', radius: 40, color: '#ff0000', points: 6 },
  { name: 'Pear', radius: 45, color: '#90ee90', points: 7 },
  { name: 'Peach', radius: 50, color: '#ffdab9', points: 8 },
  { name: 'Pineapple', radius: 55, color: '#ffff00', points: 9 },
  { name: 'Melon', radius: 60, color: '#98fb98', points: 10 },
  { name: 'Watermelon', radius: 65, color: '#006400', points: 11 },
];

function createFruit(x, y, fruit) {
  const body = Bodies.circle(x, y, fruit.radius, {
    restitution: 0.3,
    friction: 0.1,
    density: 0.001,
    render: {
      fillStyle: fruit.color,
    },
  });
  body.fruit = fruit;
  return body;
}

function generateNextFruit() {
  const randomIndex = Math.floor(Math.random() * 5); // Only generate the first 5 fruits
  nextFruit.value = FRUITS[randomIndex];
}

function dropFruit(x) {
  if (gameOver.value) return;

  const fruit = createFruit(x, 50, nextFruit.value);
  World.add(world, fruit);
  fruits.value.push(fruit);
  generateNextFruit();
  updateGhostFruit();
}

function checkCollision(event) {
  const pairs = event.pairs;
  for (let i = 0; i < pairs.length; i++) {
    const { bodyA, bodyB } = pairs[i];
    if (bodyA.fruit && bodyB.fruit && bodyA.fruit.name === bodyB.fruit.name) {
      World.remove(world, [bodyA, bodyB]);
      fruits.value = fruits.value.filter(f => f !== bodyA && f !== bodyB);

      const newFruitIndex = FRUITS.findIndex(f => f.name === bodyA.fruit.name) + 1;
      if (newFruitIndex < FRUITS.length) {
        const newFruit = FRUITS[newFruitIndex];
        const newBody = createFruit((bodyA.position.x + bodyB.position.x) / 2, (bodyA.position.y + bodyB.position.y) / 2, newFruit);
        World.add(world, newBody);
        fruits.value.push(newBody);
        score.value += newFruit.points;
      } else {
        score.value += bodyA.fruit.points * 2;
      }
    }
  }
}

function checkGameOver() {
  const topY = 150; // Adjust this value based on your game container
  for (const fruit of fruits.value) {
    if (fruit.position.y < topY) {
      gameOver.value = true;
      updateHighScore();
      return;
    }
  }
}

function startNewGame() {
  World.clear(world);
  Engine.clear(engine);
  fruits.value = [];
  score.value = 0;
  gameOver.value = false;
  generateNextFruit();
  setupBoundaries();
  updateGhostFruit();
}

function setupBoundaries() {
  const width = gameContainer.value.clientWidth;
  const height = gameContainer.value.clientHeight;
  const wallThickness = 20;

  const ground = Bodies.rectangle(width / 2, height, width, wallThickness, { isStatic: true });
  const leftWall = Bodies.rectangle(0, height / 2, wallThickness, height, { isStatic: true });
  const rightWall = Bodies.rectangle(width, height / 2, wallThickness, height, { isStatic: true });

  World.add(world, [ground, leftWall, rightWall]);
}

function updateMousePosition(event) {
  const rect = event.target.getBoundingClientRect();
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  updateGhostFruit();
}

function updateGhostFruit() {
  if (ghostFruit) {
    World.remove(world, ghostFruit);
  }
  if (nextFruit.value && !gameOver.value) {
    ghostFruit = Bodies.circle(mousePosition.value.x, 50, nextFruit.value.radius, {
      isSensor: true,
      isStatic: true,
      render: {
        fillStyle: nextFruit.value.color + '80', // Add 50% transparency
      },
    });
    World.add(world, ghostFruit);
  }
}

function updateHighScore() {
  if (score.value > highScore.value) {
    highScore.value = score.value;
    localStorage.setItem('suikaHighScore', highScore.value);
  }
}

function loadHighScore() {
  const savedHighScore = localStorage.getItem('suikaHighScore');
  if (savedHighScore) {
    highScore.value = parseInt(savedHighScore, 10);
  }
}

onMounted(() => {
  loadHighScore();

  const width = gameContainer.value.clientWidth;
  const height = gameContainer.value.clientHeight;

  engine.world.gravity.y = 0.8;
  world = engine.world;

  render = Render.create({
    element: gameContainer.value,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false,
      background: '#f0f0f0',
    },
  });

  Render.run(render);
  Engine.run(engine);

  setupBoundaries();

  const mouse = Mouse.create(render.canvas);
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  World.add(world, mouseConstraint);

  render.mouse = mouse;

  Events.on(mouseConstraint, 'mouseup', (event) => {
    const mousePosition = event.mouse.position;
    dropFruit(mousePosition.x);
  });

  Events.on(engine, 'collisionStart', checkCollision);

  generateNextFruit();
  updateGhostFruit();

  const gameLoop = setInterval(() => {
    checkGameOver();
    if (gameOver.value) {
      clearInterval(gameLoop);
    }
  }, 1000 / 60);
});

onUnmounted(() => {
  Render.stop(render);
  World.clear(world);
  Engine.clear(engine);
});

watch(gameOver, (newValue) => {
  if (newValue) {
    updateHighScore();
  }
});
</script>

<style scoped>
.suika-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.game-container {
  width: 100%;
  height: 600px;
  border: 2px solid #333;
  border-radius: 10px;
  overflow: hidden;
}

.new-game-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.new-game-btn:hover {
  background-color: #45a049;
}
</style>
