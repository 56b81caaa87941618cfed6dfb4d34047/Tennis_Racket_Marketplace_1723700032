<template>
  <header class="purple-header">
    <nav>
      <div class="logo">{{ companyName }}</div>
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.id">
          <a :href="link.url">{{ link.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const companyName = ref('Purple Company')
const navLinks = ref([
  { id: 1, text: 'Home', url: '#' },
  { id: 2, text: 'About', url: '#about' },
  { id: 3, text: 'Services', url: '#services' },
  { id: 4, text: 'Contact', url: '#contact' },
])

// Add any necessary methods, computed properties, etc.
</script>

<style scoped>
.purple-header {
  background-color: purple;
  color: white;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.nav-links li {
  margin-left: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>