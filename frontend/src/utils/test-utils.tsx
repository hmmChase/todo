// https://testing-library.com/docs/react-testing-library/setup
// https://github.com/apollographql/fullstack-tutorial/blob/master/final/client/src/test-utils.tsx

import '@testing-library/jest-dom/extend-expect';
import { FC, ReactElement, ReactNode } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';

import theme from '@/styles/theme';

type RenderApolloOptions = {
  [st: string]: any;
  addTypename?: any;
  cache?: any;
  defaultOptions?: any;
  mocks?: MockedResponse[];
  resolvers?: any;
};

const AllTheProviders: FC<{ children: ReactNode }> = ({
  addTypename,
  cache,
  children,
  defaultOptions,
  mocks,
  resolvers
}: RenderApolloOptions) => (
  <ThemeProvider theme={theme}>
    <MockedProvider
      addTypename={addTypename}
      cache={cache}
      defaultOptions={defaultOptions}
      mocks={mocks}
      resolvers={resolvers}
    >
      {children}
    </MockedProvider>
  </ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderApolloOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { userEvent };

export { customRender as render };
