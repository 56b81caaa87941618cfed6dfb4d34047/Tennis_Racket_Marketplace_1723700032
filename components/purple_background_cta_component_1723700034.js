Vue.component("purple_header_component_1723700034", {
    template: `
    <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Change Title</button>
    </div>
    `,
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
    });