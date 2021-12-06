import { css } from 'lit';

export default css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    font-family: 'Roboto Light', 'Samim', sans-serif;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  h6,
  h5,
  h4,
  h3,
  h2,
  h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  h1 {
    font-size: calc(1.375rem + 1.5vw);
  }
  @media (min-width: 1200px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: calc(1.325rem + 0.9vw);
  }
  @media (min-width: 1200px) {
    h2 {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: calc(1.3rem + 0.6vw);
  }
  @media (min-width: 1200px) {
    h3 {
      font-size: 1.75rem;
    }
  }

  h4 {
    font-size: calc(1.275rem + 0.3vw);
  }
  @media (min-width: 1200px) {
    h4 {
      font-size: 1.5rem;
    }
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  @font-face {
    font-family: 'Roboto Light';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/Roboto-Light.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Samim';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/Samim.woff') format('woff'),
      url('/fonts/Samim.ttf') format('truetype');
  }
`;
