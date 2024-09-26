<template>
  <div class="suika-game">
    <h1>Suika Game</h1>
    <p class="instructions">Merge fruits of the same type to create larger fruits and score points!</p>
    <div class="game-controls">
      <select v-model="difficulty" @change="changeDifficulty">
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
      </select>
      <button @click="togglePause">{{ isPaused ? 'Resume' : 'Pause' }}</button>
    </div>
    <canvas ref="gameCanvas" @mousemove="handleMouseMove" @click="dropFruit"></canvas>
    <div class="game-info">
      <p>Score: {{ score }}</p>
      <p>High Score: {{ highScore }}</p>
    </div>
    <div v-if="gameOver" class="game-over-overlay">
      <h2>Game Over!</h2>
      <p>Final Score: {{ score }}</p>
      <button @click="restartGame">Restart</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue';

const FRUITS = [
  { name: 'Cherry', radius: 15, color: '#FF0000', nextFruit: 'Strawberry' },
  { name: 'Strawberry', radius: 25, color: '#FF3366', nextFruit: 'Grape' },
  { name: 'Grape', radius: 35, color: '#9932CC', nextFruit: 'Orange' },
  { name: 'Orange', radius: 45, color: '#FFA500', nextFruit: 'Apple' },
  { name: 'Apple', radius: 55, color: '#008000', nextFruit: 'Pear' },
  { name: 'Pear', radius: 65, color: '#90EE90', nextFruit: 'Peach' },
  { name: 'Peach', radius: 75, color: '#FFA07A', nextFruit: 'Pineapple' },
  { name: 'Pineapple', radius: 85, color: '#FFD700', nextFruit: 'Melon' },
  { name: 'Melon', radius: 95, color: '#98FB98', nextFruit: 'Watermelon' },
  { name: 'Watermelon', radius: 105, color: '#00CED1', nextFruit: null },
];

export default {
  name: 'SuikaGame',
  setup() {
    const gameCanvas = ref(null);
    const ctx = ref(null);
    const score = ref(0);
    const highScore = ref(parseInt(localStorage.getItem('suikaHighScore')) || 0);
    const gameOver = ref(false);
    const fruits = reactive([]);
    const nextFruit = ref(null);
    const mouseX = ref(0);
    const particles = reactive([]);
    const scorePopups = reactive([]);
    const difficulty = ref('normal');
    const isPaused = ref(false);

    const canvasWidth = 400;
    const canvasHeight = 600;
    const gravity = 0.5;
    const frictionX = 0.99;
    const frictionY = 0.98;
    const bounceFactor = 0.7;

    // Sound effects
    const dropSound = new Audio('/sounds/drop.mp3');
    const mergeSound = new Audio('/sounds/merge.mp3');

    const initGame = () => {
      ctx.value = gameCanvas.value.getContext('2d');
      gameCanvas.value.width = canvasWidth;
      gameCanvas.value.height = canvasHeight;
      score.value = 0;
      gameOver.value = false;
      fruits.length = 0;
      particles.length = 0;
      scorePopups.length = 0;
      isPaused.value = false;
      generateNextFruit();
    };

    const generateNextFruit = () => {
      const randomIndex = Math.floor(Math.random() * 5); // Only generate the first 5 fruit types
      nextFruit.value = FRUITS[randomIndex];
    };

    const dropFruit = () => {
      if (gameOver.value || isPaused.value) return;

      const newFruit = {
        ...nextFruit.value,
        x: mouseX.value,
        y: nextFruit.value.radius,
        vy: 0,
        vx: 0,
      };

      fruits.push(newFruit);
      generateNextFruit();
      dropSound.play();
    };

    const createParticles = (x, y, color, count) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          radius: Math.random() * 3 + 1,
          color,
          life: 60,
        });
      }
    };

    const createScorePopup = (x, y, points) => {
      scorePopups.push({
        x,
        y,
        points,
        life: 60,
      });
    };

    const updateGame = () => {
      if (gameOver.value || isPaused.value) return;

      fruits.forEach((fruit, index) => {
        fruit.vy += gravity * getDifficultyMultiplier();
        fruit.x += fruit.vx * getDifficultyMultiplier();
        fruit.y += fruit.vy * getDifficultyMultiplier();

        // Apply friction
        fruit.vx *= frictionX;
        fruit.vy *= frictionY;

        // Bounce off walls
        if (fruit.x - fruit.radius < 0) {
          fruit.x = fruit.radius;
          fruit.vx *= -bounceFactor;
        } else if (fruit.x + fruit.radius > canvasWidth) {
          fruit.x = canvasWidth - fruit.radius;
          fruit.vx *= -bounceFactor;
        }

        // Bounce off bottom
        if (fruit.y + fruit.radius > canvasHeight) {
          fruit.y = canvasHeight - fruit.radius;
          fruit.vy *= -bounceFactor;
        }

        // Check for collisions with other fruits
        for (let i = index + 1; i < fruits.length; i++) {
          const otherFruit = fruits[i];
          const dx = otherFruit.x - fruit.x;
          const dy = otherFruit.y - fruit.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < fruit.radius + otherFruit.radius) {
            // Collision detected
            const angle = Math.atan2(dy, dx);
            const targetX = fruit.x + Math.cos(angle) * (fruit.radius + otherFruit.radius);
            const targetY = fruit.y + Math.sin(angle) * (fruit.radius + otherFruit.radius);
            const ax = (targetX - otherFruit.x) * 0.05;
            const ay = (targetY - otherFruit.y) * 0.05;

            fruit.vx -= ax;
            fruit.vy -= ay;
            otherFruit.vx += ax;
            otherFruit.vy += ay;

            // Merge fruits if they are the same type
            if (fruit.name === otherFruit.name && fruit.nextFruit) {
              const newFruitType = FRUITS.find(f => f.name === fruit.nextFruit);
              const newFruit = {
                ...newFruitType,
                x: (fruit.x + otherFruit.x) / 2,
                y: (fruit.y + otherFruit.y) / 2,
                vx: (fruit.vx + otherFruit.vx) / 2,
                vy: (fruit.vy + otherFruit.vy) / 2,
              };

              fruits.splice(Math.max(index, i), 1);
              fruits.splice(Math.min(index, i), 1, newFruit);
              const pointsGained = newFruitType.radius;
              score.value += pointsGained;
              createParticles(newFruit.x, newFruit.y, fruit.color, 20);
              createScorePopup(newFruit.x, newFruit.y, pointsGained);
              mergeSound.play();
              break;
            }
          }
        }

        // Check for game over
        if (fruit.y - fruit.radius < 0) {
          gameOver.value = true;
          if (score.value > highScore.value) {
            highScore.value = score.value;
            localStorage.setItem('suikaHighScore', highScore.value.toString());
          }
        }
      });

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx * getDifficultyMultiplier();
        particle.y += particle.vy * getDifficultyMultiplier();
        particle.life--;
        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Update score popups
      for (let i = scorePopups.length - 1; i >= 0; i--) {
        const popup = scorePopups[i];
        popup.y -= 1 * getDifficultyMultiplier();
        popup.life--;
        if (popup.life <= 0) {
          scorePopups.splice(i, 1);
        }
      }
    };

    const drawGame = () => {
      ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw fruits
      fruits.forEach(fruit => {
        ctx.value.beginPath();
        ctx.value.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
        ctx.value.fillStyle = fruit.color;
        ctx.value.fill();
        ctx.value.closePath();
      });

      // Draw particles
      particles.forEach(particle => {
        ctx.value.beginPath();
        ctx.value.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.value.fillStyle = particle.color;
        ctx.value.fill();
        ctx.value.closePath();
      });

      // Draw score popups
      scorePopups.forEach(popup => {
        ctx.value.fillStyle = 'white';
        ctx.value.font = '16px Arial';
        ctx.value.textAlign = 'center';
        ctx.value.fillText(`+${popup.points}`, popup.x, popup.y);
      });

      // Draw next fruit
      ctx.value.beginPath();
      ctx.value.arc(mouseX.value, nextFruit.value.radius, nextFruit.value.radius, 0, Math.PI * 2);
      ctx.value.fillStyle = nextFruit.value.color;
      ctx.value.globalAlpha = 0.5;
      ctx.value.fill();
      ctx.value.globalAlpha = 1;
      ctx.value.closePath();

      // Draw pause overlay
      if (isPaused.value) {
        ctx.value.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.value.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.value.fillStyle = 'white';
        ctx.value.font = '24px Arial';
        ctx.value.textAlign = 'center';
        ctx.value.fillText('PAUSED', canvasWidth / 2, canvasHeight / 2);
      }
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      requestAnimationFrame(gameLoop);
    };

    const handleMouseMove = (event) => {
      const rect = gameCanvas.value.getBoundingClientRect();
      mouseX.value = event.clientX - rect.left;
    };

    const restartGame = () => {
      initGame();
    };

    const getDifficultyMultiplier = () => {
      switch (difficulty.value) {
        case 'easy':
          return 0.8;
        case 'normal':
          return 1;
        case 'hard':
          return 1.2;
        default:
          return 1;
      }
    };

    const changeDifficulty = () => {
      // You can add any additional logic here if needed when difficulty changes
    };

    const togglePause = () => {
      isPaused.value = !isPaused.value;
    };

    onMounted(() => {
      initGame();
      gameLoop();
    });

    return {
      gameCanvas,
      score,
      highScore,
      gameOver,
      handleMouseMove,
      dropFruit,
      restartGame,
      difficulty,
      changeDifficulty,
      isPaused,
      togglePause,
    };
  },
};
</script>

<style scoped>
.suika-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 10px;
}

.instructions {
  margin-bottom: 20px;
  text-align: center;
}

.game-controls {
  margin-bottom: 10px;
}

select, button {
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

canvas {
  border: 2px solid #000;
  margin-bottom: 10px;
}

.game-info {
  text-align: center;
}

.game-over-overlay {
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

.game-over-overlay h2 {
  margin-bottom: 10px;
}

.game-over-overlay button {
  margin-top: 10px;
}
</style>