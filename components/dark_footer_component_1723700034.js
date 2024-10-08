<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Change Title</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello from dynamic SFC!',
    };
  },
  methods: {
    changeTitle() {
      this.title = 'Title Changed!';
    },
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>