<template>
  <div id="app">
    <header>
      <h1>Welcome to Our Vue 3 App</h1>
    </header>
    <main>
      <div>
        <PurpleHeaderComponent />
        <PurpleBackgroundCTAComponent />
        <PurpleFeatureGridComponent />
        <PurpleHeroComponent />
        <DarkFooterComponent />
        <ParticleComponent :title="'Particle Section'" :initialCount="1"/>
        <SimpleHeaderComponent />
      </div>
    </main>
    <footer>
      <!-- Footer Content -->
      <p>© 2023 View3. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import PurpleHeaderComponent from '../components/purple_header_component_1723700034.vue';
import PurpleBackgroundCTAComponent from '../components/purple_background_cta_component_1723700034.vue';
import PurpleFeatureGridComponent from '../components/purple_feature_grid_component_1723700034.vue';
import PurpleHeroComponent from '../components/purple_hero_component_1723700034.vue';
import DarkFooterComponent from '../components/dark_footer_component_1723700034.vue';
import ParticleComponent from '../components/particle_component_1723700034.vue';
import SimpleHeaderComponent from '../components/simple_header_component_1724462188.vue';

export default {
  name: 'App',
  components: {
    PurpleHeaderComponent,
    PurpleBackgroundCTAComponent,
    PurpleFeatureGridComponent,
    PurpleHeroComponent,
    DarkFooterComponent,
    ParticleComponent,
    SimpleHeaderComponent
  }
};
</script>

<style>
/* Add any global styles here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
main div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
header h1 {
  text-align: center;
  margin-top: 1rem;
  color: #42b983;
}
footer {
  background-color: #42b983;
  color: white;
  text-align: center;
  padding: 1em 0;
  margin-top: 2em;
}
</style>
