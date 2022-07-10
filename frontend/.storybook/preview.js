import * as NextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

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
  READ_IDEAS_PAGINATED_CURSOR,
  READ_IDEAS_PAGINATED_OFFSET,
  READ_IDEAS,
  REMOVE_IDEA,
  UPDATE_IDEA
} from '../src/__mocks__/graphql/idea';
import GlobalStyle from '../src/styles/global';
import theme from '../src/styles/theme';

// https://github.com/vercel/next.js/issues/18393
// https://dev.to/jonasmerlin/how-to-use-the-next-js-image-component-in-storybook-1415
NextImage.defaultProps = { unoptimized: true };
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => (
    <OriginalNextImage
      {...props}
      unoptimized
      loader={({ src }) => src}
      blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z'
    />
  )
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },

  nextRouter: { Provider: RouterContext.Provider }
};

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <MockedProvider
      mocks={[
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
        READ_IDEAS_PAGINATED_CURSOR,
        READ_IDEAS_PAGINATED_OFFSET,
        READ_IDEAS,
        REMOVE_IDEA,
        UPDATE_IDEA
      ]}
      // https://charles-stover.medium.com/how-to-fix-apollos-mockedprovider-returning-empty-objects-for-fragments-74c2c744dbcc
      // addTypename={false}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Story />
      </ThemeProvider>
    </MockedProvider>
  )
];
