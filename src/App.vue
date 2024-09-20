<template>
  <div id="app">
    <SimpleHeader />
    <PurpleHero />
    <PurpleFeatureGrid />
    <PurpleBackgroundCta />
    <Particle :title="'Particle Component'" :initial-count="0" />
    <DarkFooter />
  </div>
</template>

<script>
import SimpleHeader from './components/SimpleHeader.vue'
import PurpleHero from './components/PurpleHero.vue'
import PurpleFeatureGrid from './components/PurpleFeatureGrid.vue'
import PurpleBackgroundCta from './components/PurpleBackgroundCta.vue'
import Particle from './components/Particle.vue'
import DarkFooter from './components/DarkFooter.vue'

export default {
  name: 'App',
  components: {
    SimpleHeader,
    PurpleHero,
    PurpleFeatureGrid,
    PurpleBackgroundCta,
    Particle,
    DarkFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>