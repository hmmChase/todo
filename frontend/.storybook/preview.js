import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../public/styles/global.style';
import theme from '../public/styles/theme.style';

import {
  MOCK_CURRENT_USER_IDEA,
  _MOCK_ERROR_CURRENT_USER_IDEA,
  MOCK_CURRENT_USER_PAGINATED_IDEAS
} from '../__tests__/__mocks__/graphql/idea';

// loadFontsForStorybook();

addParameters({
  options: {
    // showRoots: true,

    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
});

addDecorator(withKnobs);
addDecorator(withA11y);

addDecorator(story => (
  <div style={{ padding: '1rem' }}>
    <MockedProvider
      mocks={[MOCK_CURRENT_USER_IDEA, MOCK_CURRENT_USER_PAGINATED_IDEAS]}
      addTypename={false}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        {story()}
      </ThemeProvider>
    </MockedProvider>
  </div>
));

// addParameters({
//   viewport: {
//     viewports: {
//       mobileBreakpoint: {
//         name: 'Mobile breakpoint',
//         styles: { width: '479px', height: '769px' },
//       },
//       tabletBreakpoint: {
//         name: 'Tablet breakpoint',
//         styles: { width: '768px', height: '768px' },
//       },
//       desktopBreakpoint: {
//         name: 'Desktop breakpoint',
//         styles: { width: '1024px', height: '1024px' },
//       },
//       ...INITIAL_VIEWPORTS,
//     },
//     defaultViewport: 'mobileBreakpoint',
//   },
// });

addParameters({
  backgrounds: [
    { name: 'white', value: '#FFF' },
    { name: 'gray', value: '#d3d3d3', default: true },
    { name: 'black', value: '#000' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' }
  ]
});
