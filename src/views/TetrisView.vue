<template>
  <div class="tetris-view">
    <h1 class="text-3xl font-bold text-center my-4">Tetris Game</h1>
    <TetrisGame />
  </div>
</template>

<script>
import TetrisGame from '@/components/TetrisGame.vue'

export default {
  name: 'TetrisView',
  components: {
    TetrisGame
  }
}
</script>

<style scoped>
.tetris-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>