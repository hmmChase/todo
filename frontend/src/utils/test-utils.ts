// https://testing-library.com/docs/react-testing-library/setup
// https://www.apollographql.com/docs/react/api/react/testing/
// https://github.com/apollographql/fullstack-tutorial/blob/master/final/client/src/test-utils.tsx

import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

type RenderApolloOptions = {
  mocks?: MockedResponse[],
  addTypename?: any,
  defaultOptions?: any,
  cache?: any,
  resolvers?: any,
  [st: string]: any;
}

const AllTheProviders = ({ children }) => {
  return (
    // <ThemeProvider theme='light'>
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
      removeTypename
    >
      {children}
    </MockedProvider>
    // </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
