<template>
  <div class="purple-feature-grid">
    <h2>{{ title }}</h2>
    <div class="grid">
      <div v-for="feature in features" :key="feature.id" class="feature">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Feature Grid')
const features = ref([
  { id: 1, title: 'Feature 1', description: 'Description of feature 1' },
  { id: 2, title: 'Feature 2', description: 'Description of feature 2' },
  { id: 3, title: 'Feature 3', description: 'Description of feature 3' },
  { id: 4, title: 'Feature 4', description: 'Description of feature 4' },
])

// Add any necessary methods, computed properties, etc.
</script>

<style scoped>
.purple-feature-grid {
  background-color: purple;
  color: white;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
}
</style>