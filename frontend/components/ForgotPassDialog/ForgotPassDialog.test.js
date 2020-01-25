import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ForgotPassDialog from './ForgotPassDialog';
import theme from '../../public/styles/theme.style';

jest.mock('../RequestReset/RequestReset', () => () => <div>RequestReset</div>);

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <ThemeProvider theme={theme}>
      <ForgotPassDialog {...mockProps} />
    </ThemeProvider>
  );

  const modalLinkText = 'Forgot password?';
  const modalLink = () => utils.queryByText(modalLinkText);

  const modalTitleText = 'Request a password reset';
  const modalTitle = () => utils.queryByText(modalTitleText);

  const forgotPassModal = () => utils.queryByRole('dialog');

  const clickModalLink = () => fireEvent.click(modalLink());

  return {
    ...utils,
    modalLinkText,
    modalLink,
    modalTitleText,
    modalTitle,
    forgotPassModal,
    clickModalLink
  };
};

describe('ForgotPassDialog', () => {
  afterEach(cleanup);

  it('renders modalLink', () => {
    const com = arrage();

    expect(com.modalLink()).toHaveTextContent(com.modalLinkText);
  });

  it('renders ForgotPassModal on click', () => {
    const com = arrage();

    expect(com.forgotPassModal()).not.toBeInTheDocument();

    com.clickModalLink();

    expect(com.forgotPassModal()).toBeInTheDocument();
  });
});
