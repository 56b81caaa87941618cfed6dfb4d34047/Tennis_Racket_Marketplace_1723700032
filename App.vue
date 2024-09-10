<template>
  <div id="app">
    <DarkFooter />
    <ParticleComponent title="Particle Component" :initialCount="5" />
    <PurpleBackgroundCta />
    <PurpleFeatureGrid />
    <PurpleHeader />
    <PurpleHero />
    <SimpleHeader />
  </div>
</template>

<script>
import DarkFooter from './components/dark_footer_component_162c37f45e834049b9c3a1304447b9d3.vue';
import ParticleComponent from './components/particle_component_0548c05dd6b14dcc979cb88dcc9a7ca5.vue';
import PurpleBackgroundCta from './components/purple_background_cta_component_1723700034.vue';
import PurpleFeatureGrid from './components/purple_feature_grid_component_c6f84007006e4c3e8fa1606b76820dbd.vue';
import PurpleHeader from './components/purple_header_component_ad650cc969084ec3b2e29e995d0f83e3.vue';
import PurpleHero from './components/purple_hero_component_88f8069d0c3c4092b064747649a431ba.vue';
import SimpleHeader from './components/simple_header_component_48a2a50f01cc4f3295d731a6a8cf57d7.vue';

export default {
  name: 'App',
  components: {
    DarkFooter,
    ParticleComponent,
    PurpleBackgroundCta,
    PurpleFeatureGrid,
    PurpleHeader,
    PurpleHero,
    SimpleHeader
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
  background-color: #f5f5f5;
  margin-top: 60px;
}
</style>
