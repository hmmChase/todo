import { prettyDOM, render, fireEvent, wait } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplayLoading from '../../components/DisplayLoading/DisplayLoading';
import theme from '../../public/styles/theme.style';

describe('DisplayLoading', () => {
  it('renders loading text', () => {
    const loadingText = 'Loading...';
    const mockProps = {};

    const utils = render(
      <ThemeProvider theme={theme}>
        <DisplayLoading {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent(loadingText);
  });
});
