import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayLoading from './DisplayLoading';
import theme from '../../../public/styles/theme.style';

const setup = (updatedProps = {}) => {
  const initialProps = {};
  const mergedProps = { ...initialProps, ...updatedProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DisplayLoading {...mergedProps} />
    </ThemeProvider>
  );

  const displayLoading = () => result.queryByText('Loading...');

  return { ...result, displayLoading };
};

describe('DisplayLoading', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const utils = setup();

    expect(utils.baseElement).toMatchSnapshot();
  });

  it('renders elements', () => {
    const utils = setup();

    expect(utils.displayLoading()).toBeInTheDocument();
  });
});
