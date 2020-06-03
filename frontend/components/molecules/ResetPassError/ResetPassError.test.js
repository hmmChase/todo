import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ResetPassError from './ResetPassError';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <ResetPassError {...mockProps} />
    </ThemeProvider>
  );

  const resetPassError = result.queryByText('ResetPassError');

  return { ...result, resetPassError };
};

describe('ResetPassError', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.resetPassError).toBeInTheDocument();
  });
});
