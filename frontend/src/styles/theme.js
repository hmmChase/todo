const theme = {
  unit: 8,

  widths: {
    textPageWidth: 800,
    regularPageWidth: 1100,
    largePageWidth: 1600
  },

  colors: {
    black: '#000',
    lightBlue: '#C8DCF0',
    green: 'limegreen',
    darkRed: '#8A0000',
    white: '#fff',

    backgrounds: {
      body: '#fff',
      dropdown: '#7D8088'
    },

    text: {
      titleText: '#809BFF',
      primaryText: '#393939',
      secondaryText: '#fff',
      terciaryText: '#7D8088'
    }
  },

  buttons: {
    borderRadius: '4px',
    actionButton: '#6271C0',
    actionButtonHover: '#809BFF',
    iconDefault: '#B3B3B3'
  },

  statusDisplays: {
    loading: { background: '#FFA500', text: '#000' },
    error: { background: '#FF0000', text: '#000' },
    success: { background: '#00FF00', text: '#000' },
    info: { background: '#0000FF', text: '#fff' }
  }
};

export default theme;
