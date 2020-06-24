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

  return { ...result, alertMsg };
};

describe('DisplayError', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const utils = setup();

    expect(utils.baseElement).toMatchSnapshot();
  });

  it('renders default error message', () => {
    const errorMessage = 'Opps, something went wrong.';

    const utils = setup();

    expect(utils.alertMsg()[0]).toHaveTextContent(errorMessage);
  });

  it('renders error message', () => {
    const errorMessage = 'mock general error';
    const props = { error: { message: errorMessage } };

    const utils = setup(props);

    expect(utils.alertMsg()[0]).toHaveTextContent(errorMessage);
  });

  it('renders graphQLErrors messages', () => {
    const errorMessage0 = 'mock graphQLErrors error 0';
    const errorMessage1 = 'mock graphQLErrors error 1';
    const props = {
      error: {
        graphQLErrors: [{ message: errorMessage0 }, { message: errorMessage1 }],
      },
    };

    const utils = setup(props);

    expect(utils.alertMsg()).toHaveLength(2);
    expect(utils.alertMsg()[0]).toHaveTextContent(errorMessage0);
    expect(utils.alertMsg()[1]).toHaveTextContent(errorMessage1);
  });
});
