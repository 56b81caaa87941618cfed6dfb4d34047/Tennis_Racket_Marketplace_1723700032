<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">{{ title }}</h1>
      
      <form @submit.prevent="submitForm" class="mb-6">
        <input v-model="email" type="email" placeholder="Enter your email" required class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
      </form>

      <p class="text-lg mb-4">Computed Count: {{ computedCount }}</p>
      <p class="text-lg mb-4">Email (watching for changes): {{ email }}</p>
      
      <img src="https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Tennis_Racket_Marketplace_1723700032/main/images/5eeb1c90d378439b9d2858119698da88.jpeg" alt="Description of image" class="w-full rounded-md shadow-md" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    initialCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const email = ref('');
    const count = ref(props.initialCount);

    const computedCount = computed(() => count.value * 2);

    const submitForm = () => {
      console.log('Form submitted with email:', email.value);
      email.value = ''; // Reset email after submission
    };

    watch(email, (newEmail) => {
      console.log('Email changed to:', newEmail);
    });

    return {
      email,
      count,
      computedCount,
      submitForm,
    };
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
p {
  font-size: 18px;
}
form {
  margin-top: 20px;
}
</style>
