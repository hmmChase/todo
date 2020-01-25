import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayLoading from './DisplayLoading';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <ThemeProvider theme={theme}>
      <DisplayLoading {...mockProps} />
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
