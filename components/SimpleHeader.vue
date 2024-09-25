<template>
  <header class="simple-header">
    <div class="logo">{{ logoText }}</div>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const logoText = ref('Simple Logo')
const menuItems = ref([
  { id: 1, text: 'Home', link: '#' },
  { id: 2, text: 'About', link: '#about' },
  { id: 3, text: 'Services', link: '#services' },
  { id: 4, text: 'Contact', link: '#contact' },
])
</script>

<style scoped>
.simple-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-left: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a:hover {
  color: #666;
}
</style>