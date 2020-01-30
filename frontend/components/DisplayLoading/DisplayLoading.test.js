import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayLoading from './DisplayLoading';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <DisplayLoading {...mockProps} />
    </ThemeProvider>
  );

  const displayLoading = () => result.queryByText('Loading...');

  return { ...result, displayLoading };
};

describe('DisplayLoading', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.displayLoading()).toBeInTheDocument();
  });
});
