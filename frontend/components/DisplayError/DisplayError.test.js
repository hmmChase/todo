import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayError from './DisplayError';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const defaultProps = { ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <DisplayError {...defaultProps} />
    </ThemeProvider>
  );

  const displayLoading = () => utils.queryByTestId('DisplayError');

  return { ...utils, displayLoading };
};

describe('DisplayError', () => {
  afterEach(cleanup);

  it('renders default error message', () => {
    const errorMessage = 'Opps, something went wrong.';
    const com = arrage();

    expect(com.displayLoading()).toHaveTextContent(errorMessage);
  });

  it('renders error message', () => {
    const errorMessage = 'mock general error';
    const mockProps = { error: { message: errorMessage } };
    const com = arrage(mockProps);

    expect(com.displayLoading()).toHaveTextContent(errorMessage);
  });

  it('renders graphQLErrors message', () => {
    const errorMessage = 'mock graphQLErrors error';
    const props = { error: { graphQLErrors: [{ message: errorMessage }] } };

    const com = arrage(props);

    expect(com.displayLoading()).toHaveTextContent(errorMessage);
  });
});
