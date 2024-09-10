<template>
  <div class="purple-background-cta">
    <slot></slot>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Change Title</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PurpleBackgroundCta',
  data() {
    return {
      title: 'Hello from dynamic SFC!'
    };
  },
  methods: {
    changeTitle() {
      this.title = 'Title Changed!';
    }
  }
});
</script>

<style scoped>
.purple-background-cta {
  background-color: purple;
  color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>

