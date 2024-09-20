<!-- some comment here -->

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
export default {
  name: "ParticleComponent",
  props: {
    title: {
      type: String,
      required: true
    },
    initialCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      email: "",
      count: this.initialCount,
    };
  },
  computed: {
    computedCount() {
      return this.count * 2;
    }
  },
  methods: {
    submitForm() {
      console.log("Form submitted with email:", this.email);
      this.email = ""; // Reset email after submission
    },
    incrementCount() {
      this.count++;
    }
  },
  watch: {
    email(newEmail) {
      console.log("Email changed to:", newEmail);
    }
  },
  created() {
    console.log("Component created");
  },
  mounted() {
    console.log("Component mounted");
  },
  updated() {
    console.log("Component updated");
  },
  unmounted() {
    console.log("Component unmounted");
  }
};
</script>

<style scoped>
/* Example scoped styles */
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