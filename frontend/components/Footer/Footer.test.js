import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <ThemeProvider theme={theme}>
      <Footer {...mockProps} />
    </ThemeProvider>
  );

  const footerText = 'Footer';
  const footer = utils.queryByText(footerText);

  return { ...utils, footer };
};

describe('Footer', () => {
  afterEach(cleanup);

  it('renders Footer', () => {
    const com = arrage();

    expect(com.footer).toBeInTheDocument();
  });
});
