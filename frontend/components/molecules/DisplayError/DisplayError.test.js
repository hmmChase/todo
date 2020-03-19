import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayError from './DisplayError';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DisplayError {...mockProps} />
    </ThemeProvider>
  );

  const displayError = () => result.queryByTestId('DisplayError');

  return { ...result, displayError };
};

describe('DisplayError', () => {
  afterEach(cleanup);

  it('renders default error message', () => {
    const errorMessage = 'Opps, something went wrong.';
    const com = arrage();

    expect(com.displayError()).toHaveTextContent(errorMessage);
  });

  it('renders error message', () => {
    const errorMessage = 'mock general error';
    const mockProps = { error: { message: errorMessage } };
    const com = arrage(mockProps);

    expect(com.displayError()).toHaveTextContent(errorMessage);
  });

  it('renders graphQLErrors message', () => {
    const errorMessage = 'mock graphQLErrors error';
    const props = { error: { graphQLErrors: [{ message: errorMessage }] } };

    const com = arrage(props);

    expect(com.displayError()).toHaveTextContent(errorMessage);
  });
});
