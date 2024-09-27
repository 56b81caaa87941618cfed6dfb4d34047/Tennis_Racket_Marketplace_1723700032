
<template>
  <div class="game-status">
    <div class="score-display">
      <div>Score: {{ score }}</div>
      <div>High Score: {{ highScore }}</div>
    </div>
    <div v-if="isGameOver" class="game-over">
      <h2>Game Over!</h2>
      <p>Final Score: {{ score }}</p>
      <button @click="$emit('restart')" class="restart-btn">Restart</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  score: Number,
  highScore: Number,
  isGameOver: Boolean,
});

defineEmits(['restart']);
</script>

<style scoped>
.game-status {
  width: 100%;
  text-align: center;
}

.score-display {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.restart-btn {
  margin-top: 10px;
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

.restart-btn:hover {
  background-color: #45a049;
}
</style>
