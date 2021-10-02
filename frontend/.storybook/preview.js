import { RouterContext } from 'next/dist/shared/lib/router-context';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import * as Image from 'next/image';

import GlobalStyle from '../src/styles/global';
import theme from '../src/styles/theme';
import {
  IS_LOGGED_IN,
  READ_USER,
  READ_USERS,
  CURRENT_USER,
  LOG_IN,
  LOG_OUT,
  CREATE_USER,
  REQ_PASS_RESET,
  CHANGE_PASSWORD
} from '../src/__mocks__/graphql/user';
import {
  READ_IDEA,
  READ_IDEAS,
  READ_IDEAS_CLIENT,
  READ_IDEAS_PAGINATED_OFFSET,
  READ_IDEAS_PAGINATED_CURSER,
  CURRENT_USER_IDEAS,
  CREATE_IDEA,
  UPDATE_IDEA,
  REMOVE_IDEA,
  DELETE_IDEA
} from '../src/__mocks__/graphql/idea';

// https://github.com/vercel/next.js/issues/18393
const OriginalNextImage = Image.default;
Object.defineProperty(Image, 'default', {
  configurable: true,
  value: props => (
    <OriginalNextImage {...props} unoptimized loader={({ src }) => src} />
  )
});

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <MockedProvider
      mocks={[
        // user
        IS_LOGGED_IN,
        READ_USER,
        READ_USERS,
        CURRENT_USER,
        LOG_IN,
        LOG_OUT,
        CREATE_USER,
        REQ_PASS_RESET,
        CHANGE_PASSWORD,

        // idea
        READ_IDEA,
        READ_IDEAS,
        READ_IDEAS_CLIENT,
        READ_IDEAS_PAGINATED_OFFSET,
        READ_IDEAS_PAGINATED_CURSER,
        CURRENT_USER_IDEAS,
        CREATE_IDEA,
        UPDATE_IDEA,
        REMOVE_IDEA,
        DELETE_IDEA
      ]}
      addTypename={false}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Story />
      </ThemeProvider>
    </MockedProvider>
  )
];

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },

  // controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },

  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`

    // defaults to using addon actions integration,
    // can override any method in the router
    push() {}
  }
};
