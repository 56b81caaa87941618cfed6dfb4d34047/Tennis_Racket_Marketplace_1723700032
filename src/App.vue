<template>
  <div id="app" class="min-h-screen bg-gray-100 text-gray-700">
    <!-- Navigation -->
    <simple-header-component class="bg-white shadow-md" />
    
    <!-- Main Hero Section -->
    <purple-hero-component class="bg-purple-600 text-white py-20" />

    <!-- Features Overview -->
    <purple-feature-grid-component class="py-16" />

    <!-- Call To Action -->
    <purple-background-cta-component class="bg-purple-800 text-white py-16" />

    <!-- Visual Enhancements -->
    <particle-component />

    <!-- Embedded Games --> 
    <div class="flex flex-col items-center py-10">
      <tetris-game-component class="mb-10" />
      <snake-game-component />
    </div>

    <!-- Footer -->
    <dark-footer-component class="bg-gray-900 text-white py-10" />
  </div>
</template>

<script>
import SimpleHeaderComponent from '../components/simple_header_component_1724462188.vue';
import PurpleHeroComponent from '../components/purple_hero_component_1723700034.vue';
import PurpleFeatureGridComponent from '../components/purple_feature_grid_component_1723700034.vue';
import PurpleBackgroundCtaComponent from '../components/purple_background_cta_component_1723700034.vue';
import ParticleComponent from '../components/particle_component_1723700034.vue';
import DarkFooterComponent from '../components/dark_footer_component_1723700034.vue';
import TetrisGameComponent from '../components/TetrisGameComponent.vue';
import SnakeGameComponent from '../components/SnakeGameComponent.vue';

export default {
  components: {
    SimpleHeaderComponent,
    PurpleHeroComponent,
    PurpleFeatureGridComponent,
    PurpleBackgroundCtaComponent,
    ParticleComponent,
    DarkFooterComponent,
    TetrisGameComponent,
    SnakeGameComponent,
  },
};
</script>

<style>
/* Include global styles or remove if not needed */
</style>