<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Change Title</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('Hello from dynamic SFC!');
    const changeTitle = () => {
      title.value = 'Title Changed!';
    };

    return {
      title,
      changeTitle,
    };
  },
};
</script>
