import { addons } from '@storybook/addons';

// https://storybook.js.org/docs/react/configure/features-and-behavior

addons.setConfig({
  enableShortcuts: true,
  initialActive: 'sidebar',
  isFullscreen: false,
  panelPosition: 'bottom',
  selectedPanel: undefined,
  showNav: true,
  showPanel: true,
  showToolbar: true,
  sidebar: { collapsedRoots: ['other'], showRoots: false },
  theme: undefined,
  toolbar: {
    copy: { hidden: false },
    eject: { hidden: false },
    fullscreen: { hidden: false },
    title: { hidden: false },
    zoom: { hidden: false }
  }
});
