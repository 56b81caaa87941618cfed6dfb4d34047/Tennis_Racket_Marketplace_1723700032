<template>
  <section class="purple-background-cta">
    <h2>Ready to Improve Your Game?</h2>
    <p>Find the perfect tennis racket and elevate your performance on the court.</p>
    <button>Shop Now</button>
  </section>
</template>

<script>
export default {
  name: 'PurpleBackgroundCTA'
}
</script>

<style scoped>
.purple-background-cta {
  background-color: #8a2be2;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.purple-background-cta h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.purple-background-cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.purple-background-cta button {
  background-color: white;
  color: #8a2be2;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.purple-background-cta button:hover {
  background-color: #f0f0f0;
}
</style>