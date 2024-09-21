<template>
  <div>
    <textarea v-model="text" rows="4" cols="50" readonly></textarea>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TextBoxComponent',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const text = ref(props.modelValue)

    return {
      text
    }
  }
}
</script>