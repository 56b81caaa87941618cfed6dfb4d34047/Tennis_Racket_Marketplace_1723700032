<template>
  <div id="app">
    <h1>Welcome to Vue 3</h1>
    <router-view></router-view>
    <DarkFooterComponent />
    <ParticleComponent />
    <PurpleBackgroundCtaComponent />
    <PurpleFeatureGridComponent />
    <PurpleHeaderComponent />
    <PurpleHeroComponent />
    <SimpleHeaderComponent />
  </div>
</template>

<script>
import DarkFooterComponent from "../components/dark_footer_component_1723700034.vue";
import ParticleComponent from "../components/particle_component_1723700034.vue";
import PurpleBackgroundCtaComponent from "../components/purple_background_cta_component_1723700034.vue";
import PurpleFeatureGridComponent from "../components/purple_feature_grid_component_1723700034.vue";
import PurpleHeaderComponent from "../components/purple_header_component_1723700034.vue";
import PurpleHeroComponent from "../components/purple_hero_component_1723700034.vue";
import SimpleHeaderComponent from "../components/simple_header_component_1724462188.vue";

export default {
  name: "App",
  components: {
    DarkFooterComponent,
    ParticleComponent,
    PurpleBackgroundCtaComponent,
    PurpleFeatureGridComponent,
    PurpleHeaderComponent,
    PurpleHeroComponent,
    SimpleHeaderComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>