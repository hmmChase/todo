import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <Footer {...mockProps} />
    </ThemeProvider>
  );

  const footer = result.queryByText('Footer');

  return { ...result, footer };
};

describe('Footer', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.footer).toBeInTheDocument();
  });
});
