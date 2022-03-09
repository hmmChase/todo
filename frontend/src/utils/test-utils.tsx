// https://testing-library.com/docs/react-testing-library/setup
// https://www.apollographql.com/docs/react/api/react/testing/
// https://github.com/apollographql/fullstack-tutorial/blob/master/final/client/src/test-utils.tsx

import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypename?: any;
  defaultOptions?: any;
  cache?: any;
  resolvers?: any;
  [st: string]: any;
};

const AllTheProviders = ({
  children,
  mocks,
  addTypename,
  defaultOptions,
  cache,
  resolvers
}: RenderApolloOptions) => (
  // <ThemeProvider>
  <MockedProvider
    mocks={mocks}
    addTypename={addTypename}
    defaultOptions={defaultOptions}
    cache={cache}
    resolvers={resolvers}
  >
    {children}
  </MockedProvider>
  // </ThemeProvider>
);

const renderApollo = (ui: ReactElement, options: RenderApolloOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

export { renderApollo };
