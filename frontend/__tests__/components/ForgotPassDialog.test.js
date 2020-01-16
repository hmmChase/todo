import {
  prettyDOM,
  render,
  screen,
  fireEvent,
  wait
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ForgotPassDialog from '../../components/ForgotPassDialog/ForgotPassDialog';
// import RequestReset from '../../components/RequestReset/RequestReset';
import theme from '../../public/styles/theme.style';

// jest.mock('../../components/RequestReset/RequestReset', () => {
//   const RequestReset = () => 'RequestReset';
//   return RequestReset;
// });

jest.mock('../../components/RequestReset/RequestReset', () => () =>
  'RequestReset'
);

// jest.mock(RequestReset, () => {
//   const RequestReset = () => <div />;
//   return { __esModule: true, default: RequestReset };
// }).default;

// jest.mock('../../components/RequestReset/RequestReset', () => {
//   const RequestReset = <div />;
//   return RequestReset;
// });

describe('ForgotPassDialog', () => {
  it('matches snapshot', () => {
    const mockProps = {};

    const utils = render(
      <ThemeProvider theme={theme}>
        <ForgotPassDialog {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot', () => {
    const mockProps = {};

    const utils = render(
      <ThemeProvider theme={theme}>
        <ForgotPassDialog {...mockProps} />
      </ThemeProvider>
    );

    const container = utils.container.firstChild;

    // console.log('TCL: container', prettyDOM(container));
    // console.log('TCL: container1', prettyDOM(utils.baseElement));

    const modalLink1 = utils.getByText('Forgot password?');
    console.log('TCL: modalLink1', prettyDOM(modalLink1));

    const modalLink2 = screen.getByText('Forgot password?');
    console.log('TCL: modalLink2', prettyDOM(modalLink2));

    // fireEvent.click(modalLink);

    // console.log('TCL: container2', prettyDOM(utils.baseElement));

    // expect(container).toHaveTextContent(footerText);
  });
});
