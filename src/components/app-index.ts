import type { Drawer } from '@material/mwc-drawer/mwc-drawer.js';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import config from '../config.js';
import rebootCss from '../reboot.js';
import { attachRouter, router } from '../router/index.js';
import { routes } from '../router/routes.js';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

import '@webcomponents/webcomponentsjs/webcomponents-loader.js';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-drawer';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar-fixed';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  @query('mwc-drawer')
  protected drawer!: Drawer;

  @state()
  protected location;

  constructor() {
    super();
    this.location = router.location.pathname;

    window.addEventListener('vaadin-router-location-changed', () => {
      this.location = router.location.pathname;
    });
  }

  static styles = [
    unsafeCSS(rebootCss),
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .flex {
        display: flex;
      }
      .flex-col {
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

  public isActiveUrl(path: string) {
    return router.urlForPath(path) === this.location;
  }

  render() {
    return html`
      <mwc-drawer hasHeader type="modal">
        <span slot="title">${config.appName}</span>
        <span slot="subtitle">${config.appDescription}</span>
        <div>
          <mwc-list>
            ${routes
              .filter((item) => item.show)
              .map(
                (item) => html`
                  <mwc-list-item
                    graphic="avatar"
                    ?activated="${this.isActiveUrl(item.path)}"
                    @click="${() => router.render(item.path, true)}"
                  >
                    <span>${item.label}</span>
                    <mwc-icon slot="graphic">${item.icon}</mwc-icon>
                  </mwc-list-item>
                `
              )}
          </mwc-list>
        </div>
        <div slot="appContent">
          <mwc-top-app-bar-fixed centerTitle dir="ltr">
            <mwc-icon-button
              slot="navigationIcon"
              icon="menu"
            ></mwc-icon-button>
            <div slot="title">${config.appName}</div>
            <pwa-install-button>
              <mwc-icon-button
                icon="file_download"
                slot="actionItems"
              ></mwc-icon-button>
            </pwa-install-button>
            <pwa-update-available>
              <mwc-icon-button
                icon="update"
                slot="actionItems"
              ></mwc-icon-button>
            </pwa-update-available>
          </mwc-top-app-bar-fixed>
          <main role="main"></main>
        </div>
      </mwc-drawer>
    `;
  }

  firstUpdated() {
    attachRouter(this.main);

    const container = this.drawer.parentNode;
    container?.addEventListener('MDCTopAppBar:nav', () => {
      this.drawer.open = !this.drawer.open;
    });
  }
}