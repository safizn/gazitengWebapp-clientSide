// import { LitElement, html } from '/@webcomponent/@package/lit-element/lit-element.js'
// import { LitElement, html } from 'https://unpkg.com/lit-html?module'
import { LitElement, html } from 'https://unpkg.com/lit-element?module';

class SimpleGreeting extends LitElement {
  static get properties() {
    return { name: { type: String } };
  }

  constructor() {
    super();
    this.name = 'NOOOOOOOO';
  }

  render() {
    return html`  
      <p>Hello, ${this.name}!</p>
    `;
  }
}

customElements.define('simple-greeting', SimpleGreeting);
