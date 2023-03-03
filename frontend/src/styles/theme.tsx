import type { DefaultTheme } from 'styled-components';

const colors = {
  white: 'white', // #FFFFFF
  black: 'black', // #000000

  gray: {
    light: 'lightgray', // #D3D3D3
    medium: 'gray', // #808080
    dark: '#404040'
  },

  blue: {
    light: '#C8DCF0',
    medium: '#809BFF',
    dark: '#6271C0'
  },

  pale: {
    yellow: 'LemonChiffon', // #FFFACD
    red: 'MistyRose', // #FFE4E1
    green: 'HoneyDew', // #F0FFF0
    blue: 'AliceBlue' // #F0F8FF
  }
};

const fonts = {
  title: "'Play', sans-serif",
  body: "'Open Sans', sans-serif"
};

const fontSize = {
  small: '0.9rem',
  default: '1rem',
  large: '1.1rem',
  h3: '1.2rem',
  h2: '1.3.5rem',
  h1: '1.5rem'

  // calc(16px + 6 * ((100vw - 320px) / 680))
  // min(max(16px, 4vw), 22px)
};

const borderRadius = { primary: '5px', round: '50%' };

const width = { page: '800px' };

const theme: DefaultTheme = {
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },

  fonts,
  fontSize,
  borderRadius,
  width,

  button: {
    background: colors.blue.medium,
    border: colors.blue.medium,
    borderRadius: borderRadius.primary,
    color: colors.white,

    disabled: {
      background: colors.gray.light,
      border: colors.gray.light,
      color: colors.gray.medium
    },

    hover: { background: colors.blue.dark },

    alt: {
      background: colors.pale.blue,
      color: colors.blue.medium,

      hover: { background: colors.white }
    }
  },

  background: {
    primary: colors.white,
    secondary: colors.gray.medium,
    tertiary: colors.blue.light,
    quaternary: colors.blue.medium,
    quinary: colors.blue.dark,
    senary: colors.pale.blue,
    septenary: colors.pale.red,
    octonary: colors.pale.green,
    nonary: colors.pale.yellow,
    denary: ''
  },

  text: {
    primary: colors.gray.dark,
    secondary: colors.white,
    tertiary: colors.blue.light,
    quaternary: colors.blue.dark
  },

  border: {
    primary: colors.black,
    secondary: colors.gray.medium,
    tertiary: colors.gray.dark,
    quaternary: colors.blue.light,
    quinary: colors.blue.dark
  },

  fill: {
    primary: colors.white,
    secondary: colors.gray.dark
  }
};

export default theme;
