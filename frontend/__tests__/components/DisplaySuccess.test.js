import { prettyDOM, render, fireEvent, wait } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DisplaySuccess from '../../components/DisplaySuccess/DisplaySuccess';
import theme from '../../public/styles/theme.style';

describe('DisplaySuccess', () => {
  it('renders message', () => {
    const successText = 'mock success message';
    const mockProps = { message: successText };

    const utils = render(
      <ThemeProvider theme={theme}>
        <DisplaySuccess {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent(successText);
  });
});
