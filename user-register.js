class UserRegister extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const scriptVue = document.createElement("script");
    scriptVue.src = "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js";

    const mainApp = document.createElement("div");
    mainApp.id = "app";

    const componentStyle = document.createElement("style");

    this.shadowRoot.append(scriptVue, mainApp, componentStyle);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    this.createVue(shadow);
    this.updateStyle(shadow);
  }

  createVue(shadow) {
    shadow.querySelector("script").addEventListener("load", () => {
      const template = `
      <form class="card" @submit.prevent="submit">
        <h2 class="text-blue">Register Form</h2>
        <p>This is a custom widget Web Component made with Vue.js.</p>
        <label class="label" for="first"><strong>First Name</strong></label>
        <input v-model="firstName" class="input" id="first" type="text">
        <label class="label" for="last"><strong>Last Name</strong></label>
        <input v-model="lastName" class="input" id="last" type="text">    
        <button class="btn" type="submit">Register</button>
        <p class="message">{{ message }}</p>
      </form>`;

      new Vue({
        el: shadow.querySelector("#app"),
        template,
        data: {
          firstName: "",
          lastName: "",
          message: "",
        },
        methods: {
          submit() {
            this.message = `User with name: ${this.fullName} has been registered!`;
            this.firstName = "";
            this.lastName = "";
            setTimeout(() => {
              this.message = "";
            }, 6000);
          },
        },
        computed: {
          fullName() {
            return `${this.firstName} ${this.lastName}`;
          },
        },
      });
    });
  }

  updateStyle(shadow) {
    shadow.querySelector("style").textContent = `
      .card {
        padding: 16px 30px;
        max-width: 600px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      }
      .text-blue {
        color: #2196f3;
      }
      .label {
        display: inline-block;
        margin-top: 8px;
        color: #2196f3;
      }
      .input {
        padding: 8px;
        margin: 2px 0;
        display: block;
        border: 1px solid #ccc;
        width: 100%;
      }
      .btn {
        border: none;
        display: inline-block;
        margin-top: 8px;
        padding: 8px 16px;
        vertical-align: middle;
        overflow: hidden;
        text-decoration: none;
        color: #fff;
        background-color: #2196f3;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
      }
      .message {
        color: #2196f3;
        font-weight: bold;
        text-align: center;
      }`;
  }
}

customElements.define("user-register", UserRegister);
