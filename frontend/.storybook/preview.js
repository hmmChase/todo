import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../src/styles/global';
import theme from '../src/styles/theme';

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },

  nextRouter: { Provider: RouterContext.Provider }
};
