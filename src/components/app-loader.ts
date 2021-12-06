import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import rebootCSS from '../reboot.js';

@customElement('app-loader')
export class AppLoader extends LitElement {
  static styles = [unsafeCSS(rebootCSS), css``];

  constructor() {
    super();
    window.addEventListener('load', (_e: Event) => {
      this._hidden();
    });
  }

  private _hidden(hidden = true) {
    this.hidden = hidden;
  }

  render() {
    return html``;
  }
}
