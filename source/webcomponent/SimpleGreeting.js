import { LitElement, html } from 'lit-element'; // or use `https://unpkg.com/lit-html?module` or '/@webcomponent/@package/lit-element/lit-element.js'

class SimpleGreeting extends LitElement {
  static get properties() {
    return { name: { type: String } };
  }

  constructor() {
    super();
    this.name = 'HElloooooooooooo';
  }

  render() {
    return html`  
      <p>Hello, ${this.name}!</p>
    `;
  }
}

customElements.define('simple-greeting', SimpleGreeting);
