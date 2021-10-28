const colors = {
  white: 'white', // #FFFFFF
  black: 'black', // #000000

  imperialPurple: '#66023C',

  blue: {
    light: '#C8DCF0',
    medium: '#809BFF',
    dark: '#6271C0'
  },

  gray: {
    light: 'silver', // #C0C0C0
    medium: 'gray', // #808080
    dark: '#393939'
  },

  pale: {
    yellow: 'LemonChiffon', // #FFFACD
    red: 'MistyRose', // #FFE4E1
    green: 'HoneyDew', // #F0FFF0
    blue: 'AliceBlue' // #F0F8FF
  }
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

const theme = {
  fontSize,
  borderRadius,
  width,

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
    tertiary: colors.imperialPurple,
    quaternary: colors.blue.light,
    quinary: colors.blue.dark
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
