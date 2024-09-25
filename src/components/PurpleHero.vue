<template>
  <section class="purple-hero">
    <h2>Find Your Perfect Tennis Racket</h2>
    <p>Explore our wide selection of high-quality tennis rackets</p>
    <button>Shop Now</button>
  </section>
</template>

<script>
export default {
  name: 'PurpleHero'
}
</script>

<style scoped>
.purple-hero {
  background-color: #9370db;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.purple-hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.purple-hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.purple-hero button {
  background-color: white;
  color: #9370db;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.purple-hero button:hover {
  background-color: #f0f0f0;
}
</style>