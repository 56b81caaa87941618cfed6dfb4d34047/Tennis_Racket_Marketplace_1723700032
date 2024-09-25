<template>
  <section class="purple-feature-grid">
    <h2>Our Features</h2>
    <div class="grid">
      <div class="feature" v-for="feature in features" :key="feature.title">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PurpleFeatureGrid',
  data() {
    return {
      features: [
        { title: 'Wide Selection', description: 'Choose from a variety of top brands and models.' },
        { title: 'Expert Advice', description: 'Get guidance from our tennis equipment specialists.' },
        { title: 'Quality Guarantee', description: 'All our rackets are authentic and high-quality.' },
        { title: 'Fast Shipping', description: 'Quick delivery to get you on the court faster.' }
      ]
    }
  }
}
</script>

<style scoped>
.purple-feature-grid {
  background-color: #f8f8f8;
  padding: 4rem 2rem;
  text-align: center;
}

.purple-feature-grid h2 {
  color: #8a2be2;
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature h3 {
  color: #8a2be2;
  margin-bottom: 1rem;
}
</style>