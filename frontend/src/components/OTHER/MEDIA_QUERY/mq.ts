// Not used

import { css } from 'styled-components';

const padding = { medium: 0 };
const breakpoint = 600;
const pageMargin = 5.55555;

const pageMargins = css`
  padding: 0 ${padding.medium}px;

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 1}%;
  }

  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 2}%;
  }

  @media (min-width: ${breakpoint * 3}px) {
    margin: 0 ${pageMargin * 3}%;
  }

  @media (min-width: ${breakpoint * 4}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

const breakpoints = [480, 768, 992, 1200];

export const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
