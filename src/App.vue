<template>
  <div id="app">
    <SimpleHeaderComponent />
    <router-view></router-view>
    <DarkFooterComponent />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SimpleHeaderComponent from './components/simple_header_component_1724462188.vue'
import DarkFooterComponent from './components/dark_footer_component_1723700034.vue'

export default defineComponent({
  name: 'App',
  components: {
    SimpleHeaderComponent,
    DarkFooterComponent
  }
})
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