<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Change Title</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Hello from dynamic SFC!');

function changeTitle() {
  title.value = 'Title Changed!';
}
</script>

<style scoped>
/* Add any specific styling here if needed */
</style>