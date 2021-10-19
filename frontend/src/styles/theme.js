import { css } from 'styled-components';

const colors = {
  white: white,
  black: black,

  imperialPurple: '#66023C',
  lightBlue: '#C8DCF0',

  silver: silver,
  gray: gray,
  lightBlack: '#393939',

  red: red,
  green: green,
  blue: blue,
  orange: orange,
  yellow: yellow
};

const spacing = {
  padding: { small: 10, medium: 20, large: 30 },

  borderRadius: { small: 5, default: 10 }
};

const breakpoint = 600;
const pageMargin = '5.55555';

const pageMargins = css`
  padding: 0 ${spacing.padding.medium}px;

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

export const breakpoints = [480, 768, 992, 1200];

export const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

const theme = {
  unit: 8,

  widths: {
    textPageWidth: 800,
    regularPageWidth: 1100,
    largePageWidth: 1600
  },

  layout: {
    title: colors.imperialPurple,
    text: colors.lightBlack,
    background: colors.lightBlue
  },

  border: 'rgba(0,0,0,.1)',

  statusDisplays: {
    loading: { background: '#FFA500', text: '#000' },
    error: { background: '#FF0000', text: '#000' },
    success: { background: '#00FF00', text: '#000' },
    info: { background: '#0000FF', text: '#fff' },

    positive: '#E1FFD4',
    negative: '#FEDED2',
    warning: '#FFF5CF'
  },

  dropdown: {
    background: colors.darkGrey
  },

  button: {
    borderRadius: '4px',
    background: '#6271C0',
    hover: '#809BFF',
    active: '#809BFF',
    icon: '#B3B3B3'
  }
};

export default theme;
