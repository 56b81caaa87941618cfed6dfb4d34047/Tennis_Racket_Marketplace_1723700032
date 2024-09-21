<template>
  <div>
    <button @click="generateRandomText">Generate Random Text</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RandomTextComponent',
  emits: ['generate'],
  setup(props, { emit }) {
    const generateRandomText = () => {
      const randomText = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      emit('generate', randomText)
    }

    return {
      generateRandomText
    }
  }
})
</script>