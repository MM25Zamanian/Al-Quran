import { html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import config from '../config.js';
import { PageElement } from '../helpers/page-element.js';
import rebootCss from '../reboot.js';
import { router } from '../router/index.js';
import type { Quran } from '../types/quran.js';

@customElement('page-quran-part')
export class PageQuranPart extends PageElement {
  static styles = [
    unsafeCSS(rebootCss),
    css`
      section {
        padding: 1rem;
      }

      .load,
      .load * {
        background-color: #929292 !important;
        border-radius: 4px !important;
        color: #929292 !important;
      }

      .list {
        display: flex;
        flex-direction: column;
        border: 1px solid #666;
        margin-top: 2rem;
      }
      .list > .list-item {
        display: flex;
        border-bottom: 1px solid #666;
      }
      .list > .list-item:last-child {
        border-bottom: none;
      }
      .list > .list-item > .list-item-name,
      .list > .list-item > .list-item-value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        font-size: 1rem;
        text-align: center;
        padding: 8px;
      }
      .list > .list-item > .list-item-name {
        font-weight: 100;
        color: #222;
        border-left: 1px solid #666;
      }
      .list > .list-item > .list-item-value {
        font-weight: 900;
        color: #444;
      }

      .parts {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        align-items: center;
      }
      .parts > .part {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0.25rem;
      }
      .parts > .part > .part-text,
      .parts > .part > .part-translation {
        text-align: center;
      }
      .parts > .part > .part-text {
        font-size: 1.2rem;
        font-weight: 100;
        color: #000;
      }
      .parts > .part > .part-translation {
        font-size: 1rem;
        font-weight: 900;
        color: #005a56;
      }
      .parts > .part.selected > .part-text,
      .parts > .part > .part-translation {
        display: none;
      }
      .parts > .part > .part-text,
      .parts > .part.selected > .part-translation {
        display: flex;
      }
    `,
  ];

  @state()
  protected _part: Quran | undefined = undefined;

  render() {
    return html`
      <section>
        ${this._part !== undefined
          ? html`
              <h2 class="title">سوره ${this._part.title}</h2>
              <div class="list fa">
                <div class="list-item">
                  <div class="list-item-name">نوع</div>
                  <div class="list-item-value">
                    ${this._part.revelation_place}
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">جزء</div>
                  <div class="list-item-value">${this._part.part} ام</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">تعداد آیه</div>
                  <div class="list-item-value">${this._part.counts.part}</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">تعداد کلمه</div>
                  <div class="list-item-value">${this._part.counts.words}</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">تعداد حرف</div>
                  <div class="list-item-value">${this._part.counts.letter}</div>
                </div>
              </div>
              <div class="parts">
                ${this._part.parts.map(
                  (part, index) =>
                    html`
                      <div
                        class="part"
                        @click="${this.translation}"
                        @keyup="${this.translation}"
                      >
                        <div class="part-text fa">${part.text} ﴿${index + 1}﴾</div>
                        <div class="part-translation">
                          ${part.translation} (${index + 1}) 
                        </div>
                      </div>
                    `
                )}
              </div>
            `
          : html`
              <h2 class="title load">|</h2>
              <div class="list fa load">
                <div class="list-item">
                  <div class="list-item-name">نوع</div>
                  <div class="list-item-value">|</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">جزء</div>
                  <div class="list-item-value">|</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">تعداد آیه</div>
                  <div class="list-item-value">|</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">تعداد کلمه</div>
                  <div class="list-item-value">|</div>
                </div>
                <div class="list-item">
                  <div class="list-item-name">تعداد حرف</div>
                  <div class="list-item-value">|</div>
                </div>
              </div>
            `}
      </section>
    `;
  }

  async firstUpdated() {
    console.log(router.location.params.id);

    await fetch('/api/quran.json')
      .then((response) => response.json())
      .then((data: Quran[]) => {
        this._part = data.filter(
          (item) => item.id === router.location.params.id
        )[0];
      });
  }

  translation(event: Event) {
    const target = <HTMLElement>event.target;
    const elem = <HTMLElement>target.parentElement;
    if (!elem.classList.contains('selected')) {
      elem.classList.add('selected');

      setTimeout(() => {
        if (elem.classList.contains('selected')) {
          elem.classList.remove('selected');
        }
      }, 5000);
    } else {
      elem.classList.remove('selected');
    }
  }

  meta() {
    return {
      title: this._part !== undefined ? `سوره ${this._part?.title}` : '',
      description: config.appDescription,
    };
  }
}
