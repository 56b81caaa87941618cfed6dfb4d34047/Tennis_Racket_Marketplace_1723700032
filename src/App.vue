<template>
  <div id="app">
    <SimpleHeaderComponent />
    <PurpleHeroComponent />
    <PurpleHeaderComponent />
    <PurpleFeatureGridComponent />
    <PurpleBackgroundCtaComponent />
    <ParticleComponent />
    <DarkFooterComponent />
    <TetrisGameComponent />
    <SnakeGameComponent /> <!-- Added the Snake game component here -->
  </div>
</template>

<script>
import SimpleHeaderComponent from '../components/simple_header_component_1724462188.vue';
import PurpleHeroComponent from '../components/purple_hero_component_1723700034.vue';
import PurpleHeaderComponent from '../components/purple_header_component_1723700034.vue';
import PurpleFeatureGridComponent from '../components/purple_feature_grid_component_1723700034.vue';
import PurpleBackgroundCtaComponent from '../components/purple_background_cta_component_1723700034.vue';
import ParticleComponent from '../components/particle_component_1723700034.vue';
import DarkFooterComponent from '../components/dark_footer_component_1723700034.vue';
import TetrisGameComponent from './components/TetrisGameComponent.vue';
import SnakeGameComponent from './components/SnakeGameComponent.vue'; // Importing the Snake game component

export default {
  components: {
    SimpleHeaderComponent,
    PurpleHeroComponent,
    PurpleHeaderComponent,
    PurpleFeatureGridComponent,
    PurpleBackgroundCtaComponent,
    ParticleComponent,
    DarkFooterComponent,
    TetrisGameComponent,
    SnakeGameComponent, // Registering the Snake game component
  },
};
</script>

<style>
/* Add any global styles here */
</style>
