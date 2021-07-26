class CustomElement extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

    // Create a paragraph with an id="paragraph"
    const paragraph = document.createElement("p");
    paragraph.id = "paragraph";

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    style.textContent = `
          p {
           font-size: 42px;
          }`;

    // Attach the created elements to the shadow DOM
    this.shadowRoot.append(style, paragraph);
  }

  connectedCallback() {
    // This runs each time the element is added to the DOM
    const shadow = this.shadowRoot;
    const paragraph = shadow.querySelector("#paragraph");
    paragraph.innerHTML = "This is a paragraph!";
  }
}

customElements.define("custom-element", CustomElement);
