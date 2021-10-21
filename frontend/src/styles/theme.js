// import { css } from 'styled-components';

const colors = {
  white: 'white', // #FFFFFF
  black: 'black', // #000000

  imperialPurple: '#66023C',

  lightBlue: '#C8DCF0',
  blue: '#809BFF',
  darkBlue: '#6271C0',

  gray: 'silver', // #C0C0C0
  darkGray: 'gray', // #808080
  lightBlack: '#393939',

  mistyRose: 'MistyRose', // #FFE4E1
  honeyDew: 'HoneyDew', // #F0FFF0,
  lemonChiffon: 'LemonChiffon', // #FFFACD
  aliceBlue: 'AliceBlue' // #F0F8FF
};

const fontSize = {
  small: '0.9rem',
  default: '1rem',
  large: '1.1rem',
  h3: '1.5rem',
  h2: '1.75rem',
  h1: '2rem'

  // calc(16px + 6 * ((100vw - 320px) / 680))
  // min(max(16px, 4vw), 22px)
};

const borderRadius = { primary: '5px', round: '50%' };

const width = { page: '800px' };

const theme = {
  fontSize,
  borderRadius,
  width,

  background: {
    primary: colors.white,
    secondary: colors.gray,
    tertiary: colors.lightBlue,
    quaternary: colors.blue,
    quinary: colors.darkBlue,
    senary: colors.aliceBlue,
    septenary: colors.mistyRose,
    octonary: colors.honeyDew,
    nonary: colors.lemonChiffon,
    denary: ''
  },

  text: {
    primary: colors.lightBlack,
    secondary: colors.white,
    tertiary: colors.imperialPurple,
    quaternary: colors.lightBlue,
    quinary: colors.darkBlue
  },

  border: {
    primary: colors.black,
    secondary: colors.gray,
    tertiary: colors.darkGray,
    quaternary: colors.lightBlue,
    quinary: colors.darkBlue
  },

  fill: { primary: colors.white, secondary: colors.lightBlack }
};

export default theme;
