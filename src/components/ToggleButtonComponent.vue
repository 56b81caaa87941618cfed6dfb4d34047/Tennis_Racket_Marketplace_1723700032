<template>
  <div class="flex items-center justify-center h-full">
    <button @click="toggleVisibility" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      toggle
    </button>
  </div>
</template>

<script>
export default {
  name: 'ToggleButtonComponent',
  methods: {
    toggleVisibility() {
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>