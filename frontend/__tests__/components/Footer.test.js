import { prettyDOM, render, fireEvent, wait } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Footer from '../../components/Footer/Footer';
import theme from '../../public/styles/theme.style';

describe('Footer', () => {
  it('renders loading text', () => {
    const footerText = 'Footer';
    const mockProps = {};

    const utils = render(
      <ThemeProvider theme={theme}>
        <Footer {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent(footerText);
  });
});
