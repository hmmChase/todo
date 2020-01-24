import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const defaultProps = { ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <Footer {...defaultProps} />
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
