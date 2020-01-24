import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayLoading from './DisplayLoading';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const defaultProps = { ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <DisplayLoading {...defaultProps} />
    </ThemeProvider>
  );

  const loadingText = 'Loading...';
  const displayLoading = () => utils.queryByText(loadingText);

  return { ...utils, loadingText, displayLoading };
};

describe('DisplayLoading', () => {
  afterEach(cleanup);

  it('renders DisplayLoading', () => {
    const com = arrage();

    expect(com.displayLoading()).toBeInTheDocument();
  });
});
