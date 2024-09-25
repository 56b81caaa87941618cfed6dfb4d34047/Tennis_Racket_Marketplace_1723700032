<template>
  <section class="purple-hero">
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <button @click="callToAction">{{ ctaText }}</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Welcome to Purple Hero')
const subtitle = ref('Discover the power of purple in web design')
const ctaText = ref('Learn More')

const callToAction = () => {
  console.log('Call to action clicked')
  // Add your CTA logic here
}
</script>

<style scoped>
.purple-hero {
  background-color: purple;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

button {
  background-color: white;
  color: purple;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f0f0f0;
}
</style>