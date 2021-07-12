import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ForgotPassDialog from './ForgotPassDialog';
import theme from '../../../public/styles/theme.style';

jest.mock('../../organisms/RequestReset/RequestReset', () => () => (
  <div>RequestReset</div>
));

const setup = (updatedProps = {}) => {
  const initialProps = {};
  const mergedProps = { ...initialProps, ...updatedProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <ForgotPassDialog {...mergedProps} />
    </ThemeProvider>
  );

  const modalLinkText = 'Forgot password?';
  const modalTitleText = 'Request a password reset';

  const modalLink = () => result.queryByTestId('ModalLink');
  // const modalLink = () => result.queryByText(modalLinkText);
  console.log('setup -> modalLink', modalLink());

  const modalTitle = () => result.queryByText(modalTitleText);
  // console.log('setup -> modalTitle', modalTitle());

  const forgotPassModal = () => result.queryByRole('dialog');
  // console.log('setup -> forgotPassModal', forgotPassModal());

  return { ...result, modalLink, modalTitle, forgotPassModal };
};

describe('ForgotPassDialog', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const utils = setup();

    expect(utils.modalLink()).toBeInTheDocument();
  });

  it.only('renders ForgotPassModal on click', () => {
    const utils = setup();

    expect(utils.forgotPassModal()).not.toBeInTheDocument();

    // utils.clickModalLink();

    fireEvent.click(utils.modalLink());

    utils.debug();

    // expect(utils.modalTitle()).toBeInTheDocument();
    // expect(utils.forgotPassModal()).toBeInTheDocument();
  });
});
