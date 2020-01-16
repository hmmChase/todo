import { prettyDOM, render, fireEvent, wait } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayError from '../../components/DisplayError/DisplayError';
import theme from '../../public/styles/theme.style';

describe('DisplayError', () => {
  it('renders generic error if no error message prop', () => {
    const errorMessage = 'Opps, something went wrong.';
    const mockProps = {};

    const utils = render(
      <ThemeProvider theme={theme}>
        <DisplayError {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent(errorMessage);
  });

  it('renders general errors', () => {
    const errorMessage = 'mock general error';
    const mockProps = { error: { message: 'mock general error' } };

    const utils = render(
      <ThemeProvider theme={theme}>
        <DisplayError {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent(errorMessage);
  });

  it('renders graphQLErrors', () => {
    const errorMessage = 'mock graphQLError';
    const mockProps = {
      error: { graphQLErrors: [{ message: errorMessage }] }
    };

    const utils = render(
      <ThemeProvider theme={theme}>
        <DisplayError {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent(errorMessage);
  });
});
