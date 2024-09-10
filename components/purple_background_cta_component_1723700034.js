Vue.component("purple_header_component_1723700034", {
    template: `
    <div>
      <h1>{{ title }}</h1>
      <button @click="changeTitle">Change Title</button>
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    `,
  data() {
    return {
      title: 'Hello from dynamic SFC!',
      username: '',
      password: ''
    };
  },
  methods: {
    changeTitle() {
      this.title = 'Title Changed!';
    },
    login() {
      // Logic for logging in (dummy implementation)
      if (this.username && this.password) {
          alert(`Logged in as: ${this.username}`);
      } else {
          alert('Missing username or password');
      }
    }
  },
});