// https://testing-library.com/docs/react-testing-library/setup
// https://www.apollographql.com/docs/react/api/react/testing/
// https://github.com/apollographql/fullstack-tutorial/blob/master/final/client/src/test-utils.tsx

import { ReactElement } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';

// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

type RenderApolloOptions = {
  [st: string]: any;
  addTypename?: any;
  cache?: any;
  defaultOptions?: any;
  mocks?: MockedResponse[];
  resolvers?: any;
};

const AllTheProviders = ({
  addTypename,
  cache,
  children,
  defaultOptions,
  mocks,
  resolvers
}: RenderApolloOptions) => (
  // <ThemeProvider>
  <MockedProvider
    addTypename={addTypename}
    cache={cache}
    defaultOptions={defaultOptions}
    mocks={mocks}
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
