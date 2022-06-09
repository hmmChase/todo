import { RouterContext } from 'next/dist/shared/lib/router-context';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';
import * as Image from 'next/image';

import {
  CURRENT_USER,
  IS_LOGGED_IN,
  LOG_IN,
  LOG_OUT,
  PASS_RESET_REQ,
  PASS_RESET,
  READ_USER,
  READ_USERS,
  SIGN_UP
} from '../src/__mocks__/graphql/user';
import {
  CREATE_IDEA,
  CURRENT_USER_IDEAS,
  DELETE_IDEA,
  READ_IDEA,
  READ_IDEAS_CLIENT,
  READ_IDEAS_PAGINATED_CURSER,
  READ_IDEAS_PAGINATED_OFFSET,
  READ_IDEAS,
  REMOVE_IDEA,
  UPDATE_IDEA
} from '../src/__mocks__/graphql/idea';
import GlobalStyle from '../src/styles/global';
import theme from '../src/styles/theme';

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
    // <MockedProvider
    //   mocks={[
    //     // user
    //     CURRENT_USER,
    //     IS_LOGGED_IN,
    //     LOG_IN,
    //     LOG_OUT,
    //     PASS_RESET_REQ,
    //     PASS_RESET,
    //     READ_USER,
    //     READ_USERS,
    //     SIGN_UP,

    //     // idea
    //     CREATE_IDEA,
    //     CURRENT_USER_IDEAS,
    //     DELETE_IDEA,
    //     READ_IDEA,
    //     READ_IDEAS_CLIENT,
    //     READ_IDEAS_PAGINATED_CURSER,
    //     READ_IDEAS_PAGINATED_OFFSET,
    //     READ_IDEAS,
    //     REMOVE_IDEA,
    //     UPDATE_IDEA
    //   ]}
    //   addTypename={false}
    // >
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Story />
    </ThemeProvider>
    // </MockedProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },

  apolloClient: {
    MockedProvider,

    mocks: [
      // user
      CURRENT_USER,
      IS_LOGGED_IN,
      LOG_IN,
      LOG_OUT,
      PASS_RESET_REQ,
      PASS_RESET,
      READ_USER,
      READ_USERS,
      SIGN_UP,

      // idea
      CREATE_IDEA,
      CURRENT_USER_IDEAS,
      DELETE_IDEA,
      READ_IDEA,
      READ_IDEAS_CLIENT,
      READ_IDEAS_PAGINATED_CURSER,
      READ_IDEAS_PAGINATED_OFFSET,
      READ_IDEAS,
      REMOVE_IDEA,
      UPDATE_IDEA
    ]
  },

  // actions: { argTypesRegex: '^on[A-Z].*' },

  // controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },

  nextRouter: { Provider: RouterContext.Provider }
};
