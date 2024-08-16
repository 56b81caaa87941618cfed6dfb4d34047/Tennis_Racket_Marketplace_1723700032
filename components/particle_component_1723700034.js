<template>
  <div>
    <!-- Display a prop -->
    <h1>{{ title }}</h1>

    <!-- Computed property -->
    <p>Computed Count: {{ computedCount }}</p>

    <!-- Watcher in action -->
    <p>Email (watching for changes): {{ email }}</p>

    <!-- Methods and form -->
    <form @submit.prevent="submitForm">
      <input v-model="email" type="email" placeholder="Enter your email" required />
      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
// Example child component
const ChildComponent = {
  template: `<div>A Child Component</div>`,
};

// Example mixin
const exampleMixin = {
  data() {
    return {
      mixinData: "Data from mixin"
    };
  },
  created() {
    console.log("Mixin created hook");
  }
};

export default {
  name: "ExampleComponent",
  components: {
    ChildComponent,
  },
  mixins: [exampleMixin],
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
  destroyed() {
    console.log("Component destroyed");
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