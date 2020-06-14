import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayError from './DisplayError';
import theme from '../../../public/styles/theme.style';

const setup = (updatedProps = {}) => {
  const initialProps = {};
  const mergedProps = { ...initialProps, ...updatedProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DisplayError {...mergedProps} />
    </ThemeProvider>
  );

  const alertMsg = () => result.queryAllByTestId('AlertMsg');

  console.log('setup -> alertMsg', alertMsg());

  return { ...result, alertMsg };
};

describe('DisplayError', () => {
  afterEach(cleanup);

  it('renders default error message', () => {
    const errorMessage = 'Opps, something went wrong.';
    const utils = setup();

    expect(utils.alertMsg()).toHaveTextContent(errorMessage);
  });

  it('renders error message', () => {
    const errorMessage = 'mock general error';
    const mergedProps = { error: { message: errorMessage } };
    const utils = setup(mergedProps);

    expect(utils.alertMsg()).toHaveTextContent(errorMessage);
  });

  it.only('renders graphQLErrors message', () => {
    const errorMessage0 = 'mock graphQLErrors error 0';
    const errorMessage1 = 'mock graphQLErrors error 1';
    const updatedProps = {
      error: {
        graphQLErrors: [{ message: errorMessage0 }, { message: errorMessage1 }],
      },
    };

    const utils = setup(updatedProps);

    utils.debug();

    expect(utils.alertMsg()).toHaveLength(2);
    expect(utils.alertMsg()[0]).toHaveTextContent(errorMessage0);
    expect(utils.alertMsg()[1]).toHaveTextContent(errorMessage1);
  });
});
