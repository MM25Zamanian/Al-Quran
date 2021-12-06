import {
  LitElement,
  html,
  css,
  unsafeCSS,
  // eslint-disable-next-line import/named
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { theme_color_500 } from '../colors.js';
import config from '../config.js';
import rebootCSS from '../reboot.js';
import { router } from '../router/index.js';
import { Route, routes } from '../router/routes.js';

// color(theme_color_900.toString()).alpha(0.28);
@customElement('app-navigation')
export class AppNavigation extends LitElement {
  protected routelist = routes;

  @state()
  protected location;

  @state()
  protected rtl = document.body.dir === 'rtl';

  @property({ type: Boolean })
  public open = false;

  constructor() {
    super();
    this.location = window.location.pathname;

    window.addEventListener('vaadin-router-location-changed', () => {
      this.location = window.location.pathname;
    });
  }

  static styles = [
    unsafeCSS(rebootCSS),
    css`
      :host {
        z-index: 64;
      }
      nav {
        position: fixed;
        width: 80px;
        height: 100%;
        overflow-x: hidden;
      }
      nav > .nav-bg {
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
          url('/images/navigation-wallpaper/wallpaper1.jpg');
        background-size: cover;
        background-position: ${document.body.dir === 'rtl'
          ? css`right`
          : css`center`};
      }
      nav > .nav__box {
        display: flex;
        height: 100%;
        width: 100%;
        padding: 15px 0;
      }
      nav > .nav__item-base {
        display: flex;
        width: 100%;
        height: 50px;
        /* margin: 10px 10px 0; */
        background-color: #ff0;
      }
      nav > .nav__header-logo {
        width: 50px;
        height: 50px;
      }
      nav > .nav__header-logo > img {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  public isActiveUrl(path: string, success: string | null = null) {
    return router.urlForPath(path) === this.location
      ? success || ' active'
      : '';
  }

  public getLabelItemTranslation(item: Route) {
    return this.rtl ? item.label['fa'] : item.label['en'];
  }

  public navOpen() {
    this.open = true;
  }
  public navClose() {
    this.open = false;
  }
  public navSwitch() {
    if (!this.open) {
      this.navOpen();
    } else {
      this.navClose();
    }
  }

  protected render(): TemplateResult {
    return html`
      <nav>
        <div class="nav-bg"></div>
        <div class="nav__box">
          <div class="nav__item-base nav__header">
            <div class="nav__header-logo">
              <img src="/images/logo.png" alt="logo" />
            </div>
            <span class="nav__header-brand">${config.appName}</span>
          </div>
          <section class="nav__container">
            ${routes
              .filter((item) => item.show)
              .map(
                (item) => html`
                  <a href="#" class="nav__item-base nav__item">
                    <div class="nav__item-icon">
                      <ion-icon
                        name="${ifDefined(
                          item.icon === null ? undefined : item.icon
                        )}"
                      ></ion-icon>
                    </div>
                    <span class="nav__item-text">
                      ${this.getLabelItemTranslation(item)}
                    </span>
                  </a>
                `
              )}
          </section>
        </div>
      </nav>
    `;
  }
}
