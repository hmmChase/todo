// https://testing-library.com/docs/react-testing-library/setup
// https://www.apollographql.com/docs/react/api/react/testing/

import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

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
