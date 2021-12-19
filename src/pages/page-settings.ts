import type { Slider } from '@material/mwc-slider';
import { html, css, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  red_600,
  pink_600,
  purple_600,
  deep_purple_600,
  indigo_600,
  blue_600,
  light_blue_600,
  cyan_600,
  teal_600,
  green_600,
  light_green_600,
  lime_600,
  yellow_600,
  amber_600,
  orange_600,
  deep_orange_600,
} from '../colors.js';
import config from '../config.js';
import { PageElement } from '../helpers/page-element.js';
import rebootCss from '../reboot.js';
import type { Color } from '../types/color.js';
import { colors } from '../utils/colors.js';

import '@material/mwc-slider';

@customElement('page-settings')
export class PageSettings extends PageElement {
  @state()
  protected font_size = 0;

  @state()
  protected color!: Color;

  @query('mwc-slider')
  protected slider!: Slider;

  @state()
  protected themeColor = window.localStorage.getItem('themeColor');

  @state()
  protected fontSize = window.localStorage.getItem('fontSize');

  static styles = [
    unsafeCSS(rebootCss),
    css`
      mwc-slider {
        direction: ltr;
      }
    `,
    css`
      section {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        padding: 0.5rem 1rem;
      }
      .colors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .color {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;

        width: 40px;
        height: 40px;
        margin: 5px;

        transition: outline 250ms ease;
        border: 3px solid #fff;
        outline: 2px solid #fff;
        border-radius: 50%;
      }
      .color.active {
        outline: 2px solid #333;
      }
      .color.red {
        background-color: ${red_600};
      }
      .color.pink {
        background-color: ${pink_600};
      }
      .color.purple {
        background-color: ${purple_600};
      }
      .color.deep_purple {
        background-color: ${deep_purple_600};
      }
      .color.indigo {
        background-color: ${indigo_600};
      }
      .color.blue {
        background-color: ${blue_600};
      }
      .color.light_blue {
        background-color: ${light_blue_600};
      }
      .color.cyan {
        background-color: ${cyan_600};
      }
      .color.teal {
        background-color: ${teal_600};
      }
      .color.green {
        background-color: ${green_600};
      }
      .color.light_green {
        background-color: ${light_green_600};
      }
      .color.lime {
        background-color: ${lime_600};
      }
      .color.yellow {
        background-color: ${yellow_600};
      }
      .color.amber {
        background-color: ${amber_600};
      }
      .color.orange {
        background-color: ${orange_600};
      }
      .color.deep_orange {
        background-color: ${deep_orange_600};
      }
    `,
    css`
      .box {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        padding: 1rem;
        border: 1px solid #0002;
        border-radius: 6px;
        max-width: 1000px;

        margin: 1.5rem 1rem 0;
      }
      .box-title {
        display: flex;
        width: max-content;
        padding: 2px 12px;
        margin: 0;
        margin-top: -2rem;
        background-color: #fff;
        font-size: 1.2rem;
      }
    `,
    css`
      .parts {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .parts > .part {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0.25rem;
      }
      .parts > .part > .part-text,
      .parts > .part > .part-translation {
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: var(--quran-fs);
        font-weight: 100;
        position: relative;
        overflow: hidden;
        transition: max-height 500ms ease, opacity 300ms ease-in-out;
      }

      .parts > .part > .part-text {
        color: #000;
        margin-bottom: 6px;
      }
      .parts > .part > .part-translation {
        color: var(--mdc-theme-primary, #334);
        padding: 0 5px;
        max-height: 150px;
        opacity: 1;
      }
      .parts > .part > .part-translation:before {
        content: '';
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-color: var(--mdc-theme-primary, #334);
        opacity: 0.15;
        border-radius: 4px;
      }
    `,
  ];

  render() {
    return html`
      <section>
        <div class="box">
          <h2 class="box-title">پیش نمایش</h2>
          <div class="parts">
            <div class="part">
              <div class="part-text fa">
                بِسْمِ اللَّـهِ الرَّ‌حْمَـٰنِ الرَّ‌حِيمِ ﴿1﴾
              </div>
              <div class="part-translation">
                به نام خداوند رحمتگر مهربان (1)
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <h2 class="box-title">رنگ</h2>
          <div class="colors">
            ${colors.map((color) => {
              const style = { [color.color_name]: true };

              return html`
                <div
                  @click=${() => this.changeThemeColor(color)}
                  @keyup=${() => this.changeThemeColor(color)}
                  class="color ${classMap({
                    active: color.color_name === this.themeColor,
                    ...style,
                  })}"
                ></div>
              `;
            })}
          </div>
        </div>
        <div class="box">
          <h2 class="box-title">اندازه فونت آیات</h2>
          <mwc-slider
            withTickMarks
            step="1"
            min="0"
            max="15"
            @input=${this.changeFontSize}
            value="${ifDefined(
              this.fontSize === null ? undefined : Number(this.fontSize) - 13
            )}"
          >
          </mwc-slider>
        </div>
      </section>
    `;
  }

  changeThemeColor(color: Color) {
    window.localStorage.setItem('themeColor', color.color_name);

    (<HTMLElement>document.querySelector(':root')).style.setProperty(
      '--mdc-theme-primary',
      colors.filter(
        (color) => color.color_name == window.localStorage.getItem('themeColor')
      )[0].hexa
    );

    this.themeColor = window.localStorage.getItem('themeColor');
  }

  changeFontSize() {
    window.localStorage.setItem('fontSize', String(this.slider.value + 13));

    (<HTMLElement>document.querySelector(':root')).style.setProperty(
      '--quran-fs',
      window.localStorage.getItem('fontSize') + 'px'
    );

    this.fontSize = window.localStorage.getItem('fontSize');
  }

  meta() {
    return {
      title: 'تنظیمات',
      description: config.appDescription,
    };
  }
}
