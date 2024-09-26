<template>
  <div id="app">
    <SimpleHeader />
    <main>
      <h1>{{ appTitle }}</h1>
      <SuikaGame />
    </main>
    <DarkFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SimpleHeader from './components/SimpleHeader.vue'
import SuikaGame from './components/SuikaGame.vue'
import DarkFooter from './components/DarkFooter.vue'

const appTitle = ref('Suika Game')
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>