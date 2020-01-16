import { prettyDOM, render, fireEvent, wait } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import DetailIcon from '../../components/DetailIcon/DetailIcon';
import theme from '../../public/styles/theme.style';

describe('DetailIcon', () => {
  it('matches snapshot', () => {
    const mockProps = { id: '1' };

    const utils = render(
      <ThemeProvider theme={theme}>
        <DetailIcon {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
  });

  xit('has correct href', () => {
    const mockProps = { id: '1' };

    const utils = render(
      <ThemeProvider theme={theme}>
        <DetailIcon {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;
    console.log('TCL: container', prettyDOM(utils.baseElement));

    expect(container).toHaveAttribute('href', '/idea?id=1');
  });
});
