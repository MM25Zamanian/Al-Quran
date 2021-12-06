/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import rebootCss from '../reboot.js';
import { attachRouter } from '../router/index.js';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

import './app-navigation.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  static styles = [
    unsafeCSS(rebootCss),
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      main,
      main > * {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
    `,
  ];

  render() {
    return html`
      <app-header></app-header>
      <app-navigation></app-navigation>
      <main role="main"></main>
    `;
  }

  firstUpdated() {
    attachRouter(this.main);
  }
}

/* 
<pwa-install-button>
  <button>Install app</button>
</pwa-install-button>

<pwa-update-available>
  <button>Update app</button>
</pwa-update-available>
 */
