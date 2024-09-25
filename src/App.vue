<template>
  <div id="app">
    <SimpleHeader />
    <PurpleHeader />
    <PurpleHero />
    <ParticleComponent title="Welcome to Vue 3" :initialCount="0" />
    <PurpleFeatureGrid />
    <PurpleBackgroundCTA />
    <DarkFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SimpleHeader from './components/SimpleHeader.vue'
import PurpleHeader from './components/PurpleHeader.vue'
import PurpleHero from './components/PurpleHero.vue'
import ParticleComponent from './components/ParticleComponent.vue'
import PurpleFeatureGrid from './components/PurpleFeatureGrid.vue'
import PurpleBackgroundCTA from './components/PurpleBackgroundCTA.vue'
import DarkFooter from './components/DarkFooter.vue'

// You can add any app-level logic here if needed
const appTitle = ref('Vue 3 Application')
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