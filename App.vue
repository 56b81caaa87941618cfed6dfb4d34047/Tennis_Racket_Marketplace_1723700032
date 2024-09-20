<template>
  <div id="app">
    <SimpleHeaderComponent />
    <PurpleHeroComponent />
    <div class="tetris-container">
      <TetrisGame />
    </div>
    <PurpleFeatureGridComponent />
    <PurpleBackgroundCtaComponent />
    <ParticleComponent title="Particle Component" :initialCount="5" />
    <DarkFooterComponent />
  </div>
</template>

<script>
import DarkFooterComponent from './components/dark_footer_component_1723700034.vue';
import ParticleComponent from './components/particle_component_1723700034.vue';
import PurpleBackgroundCtaComponent from './components/purple_background_cta_component_1723700034.vue';
import PurpleFeatureGridComponent from './components/purple_feature_grid_component_1723700034.vue';
import PurpleHeroComponent from './components/purple_hero_component_1723700034.vue';
import SimpleHeaderComponent from './components/simple_header_component_1724462188.vue';
import TetrisGame from './components/TetrisGame.vue';

export default {
  components: {
    DarkFooterComponent,
    ParticleComponent,
    PurpleBackgroundCtaComponent,
    PurpleFeatureGridComponent,
    PurpleHeroComponent,
    SimpleHeaderComponent,
    TetrisGame,
  },
};
</script>

<style>
/* Add any global styles here */
.tetris-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  background-color: #f0f0f0;
}
</style>