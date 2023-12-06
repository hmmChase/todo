import type { Preview } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'styled-components';

import { CURRENT_USER } from '../src/mocks/user/graphql';
import { READ_TASKS } from '../src/mocks/task/graphql';
import GlobalStyle from '../src/styles/global';
import theme from '../src/styles/theme';
// import {
//   CREATE_TASK,
//   CURRENT_USER_TASKS,
//   DELETE_TASK,
//   READ_TASK,
//   READ_TASKS_CLIENT,
//   READ_TASKS_PAGINATED_CURSOR,
//   READ_TASKS_PAGINATED_OFFSET,
//   READ_TASKS,
//   REMOVE_TASK,
//   UPDATE_TASK
// } from '../src/__mocks__/graphql/task';
// import * as NextImage from 'next/legacy/image';

// https://github.com/vercel/next.js/issues/18393
// https://dev.to/jonasmerlin/how-to-use-the-next-js-image-component-in-storybook-1415
// NextImage.defaultProps = { unoptimized: true };
// const OriginalNextImage = NextImage.default;
// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: props => (
//     <OriginalNextImage
//       {...props}
//       unoptimized
//       loader={({ src }) => src}
//       blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z'
//     />
//   )
// });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } }
  }
};

// Global decorator to apply the styles to all stories
// export const decorators = [
//   Story => (
//     <MockedProvider
//       mocks={[
//         // // user
//         CURRENT_USER,
//         // IS_LOGGED_IN,
//         // LOG_IN,
//         // LOG_OUT,
//         // PASS_RESET_REQ,
//         // PASS_RESET,
//         // READ_USER,
//         // READ_USERS,
//         // SIGN_UP,
//         // // task
//         // CREATE_TASK,
//         // CURRENT_USER_TASKS,
//         // DELETE_TASK,
//         // READ_TASK,
//         // READ_TASKS_CLIENT,
//         // READ_TASKS_PAGINATED_CURSOR,
//         // READ_TASKS_PAGINATED_OFFSET,
//         READ_TASKS
//         // REMOVE_TASK,
//         // UPDATE_TASK
//       ]}
//       // https://charles-stover.medium.com/how-to-fix-apollos-mockedprovider-returning-empty-objects-for-fragments-74c2c744dbcc
//       // addTypename={false}
//     >
//       <ThemeProvider theme={theme}>
//         <GlobalStyle />

//         <Story />
//       </ThemeProvider>
//     </MockedProvider>
//   )
// ];

export default preview;
