<template>
  <header class="simple-header">
    <h1>Tennis Racket Marketplace</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'SimpleHeader'
}
</script>

<style scoped>
.simple-header {
  background-color: #f8f8f8;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.simple-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.simple-header nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.simple-header nav ul li {
  margin-left: 1rem;
}

.simple-header nav ul li a {
  text-decoration: none;
  color: #333;
}
</style>