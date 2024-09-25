<template>
  <div class="particle-component">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <button @click="incrementCount">Increment</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ParticleComponent',
  props: {
    title: {
      type: String,
      default: 'Particle Component'
    },
    initialCount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const count = ref(props.initialCount)

    const incrementCount = () => {
      count.value++
    }

    return {
      count,
      incrementCount
    }
  }
}
</script>

<style scoped>
.particle-component {
  background-color: #f0f0f0;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.particle-component button {
  background-color: #9370db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.particle-component button:hover {
  background-color: #8a2be2;
}
</style>