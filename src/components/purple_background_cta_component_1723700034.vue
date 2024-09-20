<template>
  <section class="bg-purple-700 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h2>
        <p class="text-lg mb-8">{{ description }}</p>
        <button @click="handleCtaClick" class="bg-white text-purple-700 font-bold py-3 px-8 rounded-full hover:bg-purple-100 transition duration-300">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PurpleBackgroundCtaComponent',
  data() {
    return {
      title: 'Get Your Perfect Racket Today!',
      description: 'Find the ideal tennis racket that matches your playing style and elevate your game to new heights.',
      buttonText: 'Shop Now',
    };
  },
  methods: {
    handleCtaClick() {
      // You can add navigation logic or other actions here
      console.log('CTA button clicked');
    },
  },
}
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>