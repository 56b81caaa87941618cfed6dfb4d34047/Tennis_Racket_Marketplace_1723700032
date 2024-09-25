<template>
  <header class="purple-header">
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
  name: 'PurpleHeader'
}
</script>

<style scoped>
.purple-header {
  background-color: #8a2be2;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.purple-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.purple-header nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.purple-header nav ul li {
  margin-left: 1rem;
}

.purple-header nav ul li a {
  text-decoration: none;
  color: white;
}
</style>