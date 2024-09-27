<template>
  <div class="fruit-preview">
    <h3>Next Fruit</h3>
    <div class="fruit-container" :style="fruitStyle">
      <div class="fruit" :style="{ backgroundColor: nextFruit.color }"></div>
    </div>
    <p>{{ nextFruit.name }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  nextFruit: {
    type: Object,
    required: true
  }
});

const fruitStyle = computed(() => {
  const size = props.nextFruit.radius * 2;
  return {
    width: `${size}px`,
    height: `${size}px`
  };
});
</script>

<style scoped>
.fruit-preview {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

.fruit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
}

.fruit {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

p {
  margin: 0;
  font-weight: bold;
}
</style>