import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import type { MockedResponse } from '@apollo/client/testing';
import type { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';

import theme from '@/styles/theme';

// https://testing-library.com/docs/react-testing-library/setup
// https://github.com/apollographql/fullstack-tutorial/blob/master/final/client/src/test-utils.tsx

type RenderApolloOptions = {
  [st: string]: any;
  addTypename?: any;
  cache?: any;
  defaultOptions?: any;
  mocks?: MockedResponse[];
  resolvers?: any;
};

const customRender = (
  children: ReactNode,
  {
    addTypename,
    cache,
    defaultOptions,
    mocks,
    resolvers,
    ...options
  }: RenderApolloOptions = {}
) => {
  return render(
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
    </ThemeProvider>,
    options
  );
};

export * from '@testing-library/react';

export { userEvent };

export { customRender as render };
