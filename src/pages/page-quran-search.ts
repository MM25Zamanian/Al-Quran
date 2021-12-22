import { html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import config from '../config.js';
import { PageElement } from '../helpers/page-element.js';
import rebootCss from '../reboot.js';
import { router } from '../router/index.js';
import type { Quran } from '../types/quran.js';
import { removeUseLessLetter } from '../utils/remove-use-less.js';

@customElement('page-quran-search')
export class PageQuranSearch extends PageElement {
  static styles = [
    unsafeCSS(rebootCss),
    css`
      section {
        padding: 1rem;
      }
    `,
  ];

  @state()
  protected _quran_result: Quran[] | undefined = undefined;

  render() {
    return html` <section></section> `;
  }

  async firstUpdated() {
    const query_cleaned = removeUseLessLetter(
      <string>router.location.params.query
    );

    await fetch('/api/quran.json')
      .then((response) => response.json())
      .then((data: Quran[]) => {
        const regex = new RegExp(`^(.*)(${query_cleaned})(.*)$`);
        const results: Quran[] = [];
        data.forEach((quran_part) => {
          quran_part.parts.forEach((part) => {
            const text_cleaned = removeUseLessLetter(part.text);

            if (regex.test(text_cleaned)) {
              results.push(quran_part);
            }
          });
        });
        console.log(results);
      });
  }

  meta() {
    return {
      title:
        router.location.params.query !== undefined
          ? `${router.location.params.query}`
          : '',
      description: config.appDescription,
    };
  }
}
