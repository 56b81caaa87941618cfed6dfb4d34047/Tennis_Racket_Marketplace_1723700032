<template>
  <div id="app">
    <h1>Welcome to Tennis Racket Marketplace</h1>
    <SimpleHeader />
    <PurpleHero />
    <PurpleBackgroundCta />
    <PurpleFeatureGrid />
    <PurpleHeader />
    <DarkFooter />
    <Particle />
  </div>
</template>

<script>
import SimpleHeader from './components/simple_header_component_1724462188.vue';
import PurpleHero from './components/purple_hero_component_1723700034.vue';
import PurpleBackgroundCta from './components/purple_background_cta_component_1723700034.vue';
import PurpleFeatureGrid from './components/purple_feature_grid_component_1723700034.vue';
import PurpleHeader from './components/purple_header_component_1723700034.vue';
import DarkFooter from './components/dark_footer_component_1723700034.vue';
import Particle from './components/particle_component_1723700034.vue';

export default {
  name: 'App',
  components: {
    SimpleHeader,
    PurpleHero,
    PurpleBackgroundCta,
    PurpleFeatureGrid,
    PurpleHeader,
    DarkFooter,
    Particle
  }
};
</script>

<style>
/* Add any global styles here */
</style>
