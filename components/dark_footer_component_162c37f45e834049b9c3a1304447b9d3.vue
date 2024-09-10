<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Change Title</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const title = ref('Hello from dynamic SFC!');

    function changeTitle() {
      title.value = 'Title Changed!';
    }

    return {
      title,
      changeTitle,
    };
  },
});
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
