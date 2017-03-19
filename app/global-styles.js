import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 13pt;
    font-weight: 200;
  }

  body.fontLoaded {
    font-family: 'Roboto Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 200;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  hr {
    border-top: none;
    border-bottom: 1px dashed #E0E0E0;
  }

  [data-reactroot] {
    position: absolute; width: 100% !important; height: 100% !important;
  }
`;
