<template>
  <div class="suika-game">
    <div class="game-info">
      <div class="score">Score: {{ score }}</div>
      <div class="next-fruit">Next: {{ nextFruitName }}</div>
    </div>
    <div ref="gameContainer" class="game-container"></div>
    <button @click="startNewGame" class="new-game-btn">New Game</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Matter from 'matter-js';

const gameContainer = ref(null);
const score = ref(0);
const nextFruit = ref(null);
const fruits = ref([]);
const gameOver = ref(false);

const { Engine, Render, World, Bodies, Body, Events, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
let render;
let world;
let mouseConstraint;

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

const nextFruitName = computed(() => nextFruit.value ? nextFruit.value.name : '');

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

onMounted(() => {
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
</script>

<style scoped>
.suika-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.game-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
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