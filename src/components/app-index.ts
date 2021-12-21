import type { Button } from '@material/mwc-button/mwc-button.js';
import type { Dialog } from '@material/mwc-dialog/mwc-dialog.js';
import type { Drawer } from '@material/mwc-drawer/mwc-drawer.js';
import type { TextField } from '@material/mwc-textfield/mwc-textfield.js';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import config from '../config.js';
import rebootCss from '../reboot.js';
import { attachRouter, router, urlForName } from '../router/index.js';
import { routes } from '../router/routes.js';
import type { Quran } from '../types/quran.js';
import { colors } from '../utils/colors.js';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

import '@webcomponents/webcomponentsjs/webcomponents-loader.js';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-textfield';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-circular-progress-four-color';

@customElement('app-index')
export class AppIndex extends LitElement {
  @query('main')
  private main!: HTMLElement;

  @query('mwc-drawer')
  protected drawer!: Drawer;

  @query('mwc-dialog#search-dialog')
  protected searchbox!: Dialog;

  @query('mwc-dialog#search-dialog > mwc-textfield')
  protected searchinput!: TextField;

  @query('mwc-dialog#search-dialog > mwc-button')
  protected searchbutton!: Button;

  @property()
  public app_title = config.appName;

  @property({ type: Boolean })
  public loader = true;

  @state()
  private location;

  @state()
  private quran: Quran[] = [];

  constructor() {
    super();
    this.location = router.location.pathname;

    if (!window.localStorage.getItem('themeColor')) {
      window.localStorage.setItem('themeColor', 'cyan');
    }

    if (!window.localStorage.getItem('fontSize')) {
      window.localStorage.setItem('fontSize', '20');
    }

    (<HTMLElement>document.querySelector(':root')).style.setProperty(
      '--mdc-theme-primary',
      colors.filter(
        (color) => color.color_name == window.localStorage.getItem('themeColor')
      )[0].hexa
    );

    (<HTMLElement>document.querySelector(':root')).style.setProperty(
      '--quran-fs',
      window.localStorage.getItem('fontSize') + 'px'
    );

    window.addEventListener('load', () => {
      this.loader = false;
    });

    window.addEventListener('vaadin-router-location-changed', () => {
      this.loader = false;
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

      mwc-drawer mwc-list-item {
        margin: 8px;
        border-radius: 6px;
      }

      mwc-drawer mwc-list-item:first-of-type {
        margin-top: 4px;
      }

      mwc-drawer mwc-list-item:last-of-type {
        margin-bottom: 4px;
      }
    `,
    css`
      .desktop-forbidden {
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
        z-index: 64;
        background-color: var(--mdc-theme-primary);
      }
      .desktop-forbidden .title {
        color: #fff;
        font-size: 3rem;
        font-weight: 900;
        transition: text-shadow 300ms ease;
      }
      @media (orientation: portrait) {
        .desktop-forbidden {
          display: none;
        }
      }
    `,
  ];

  public isActiveUrl(path: string) {
    return router.urlForPath(path) === this.location;
  }

  render() {
    return html`
      <div class="desktop-forbidden">
        <span class="title">متاسفانه این اپلیکیشن فقط برای دستگاه های تلفن همراه میباشید</span>
      </div>
      <mwc-drawer hasHeader type="modal">
        <span slot="title">${config.appName}</span>
        <span slot="subtitle">${config.appDescription}</span>
        <div>
          <mwc-list activatable>
            ${routes
              .filter((item) => item.show)
              .map(
                (item) => html`
                  <mwc-list-item
                    graphic="avatar"
                    ?activated="${this.isActiveUrl(item.path)}"
                    ?selected="${this.isActiveUrl(item.path)}"
                    @click="${() => this.routerRender(item.path)}"
                  >
                    <span>${item.label}</span>
                    <mwc-icon slot="graphic">${item.icon}</mwc-icon>
                  </mwc-list-item>
                `
              )}
            <li divider role="separator"></li>
          </mwc-list>
          <mwc-list>
            ${this.quran.map(
              (item) => html`
                <mwc-list-item
                  twoline
                  graphic="avatar"
                  @click="${() =>
                    this.routerRender(
                      urlForName('quran_part', { id: item.id })
                    )}"
                  ?activated="${this.isActiveUrl(
                    urlForName('quran_part', { id: item.id })
                  )}"
                >
                  <span>سوره ${item.title}</span>
                  <span slot="secondary"
                    >${item.revelation_place} - جزء ${item.part} ام</span
                  >
                  <mwc-icon slot="graphic">menu_book</mwc-icon>
                </mwc-list-item>
              `
            )}
            <li divider role="separator"></li>
          </mwc-list>
          <mwc-list>
            <pwa-install-button>
              <mwc-list-item graphic="avatar">
                <span>نصب</span>
                <mwc-icon slot="graphic">file_download</mwc-icon>
              </mwc-list-item>
            </pwa-install-button>
            <pwa-update-available>
              <mwc-list-item graphic="avatar">
                <span>بروزرسانی</span>
                <mwc-icon slot="graphic">update</mwc-icon>
              </mwc-list-item>
            </pwa-update-available>
          </mwc-list>
        </div>
        <div slot="appContent">
          <mwc-top-app-bar-fixed centerTitle dir="ltr">
            <mwc-icon-button
              slot="navigationIcon"
              icon="menu"
            ></mwc-icon-button>
            <div slot="title">${this.app_title}</div>
            </mwc-textfield>
            <mwc-circular-progress-four-color
              indeterminate
              slot="actionItems"
              ?closed=${!this.loader}
            ></mwc-circular-progress-four-color>
          </mwc-top-app-bar-fixed>
          <main role="main"></main>
        </div>
      </mwc-drawer>
      <mwc-dialog id="search-dialog" stacked heading="جستجو" @click="${() =>
        (this.searchbox.open = true)}">
        <mwc-textfield
          id="search"
          placeholder="جستجو"
          required
          >
        </mwc-textfield>
        <mwc-button raised label="جستجو" slot="primaryAction"></mwc-button>
      </mwc-dialog>
    `;
  }

  protected async routerRender(path: string) {
    this.loader = true;
    this.drawer.open = false;
    await router.render(path, true);
    this.loader = false;
  }

  async firstUpdated() {
    attachRouter(this.main);

    await fetch('/api/quran.json')
      .then((response) => response.json())
      .then((data) => (this.quran = data));

    const container = <HTMLElement>this.drawer.parentNode;
    container.addEventListener('MDCTopAppBar:nav', () => {
      this.drawer.open = !this.drawer.open;
    });
  }
}
