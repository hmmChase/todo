import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ForgotPassDialog from './ForgotPassDialog';
import theme from '../../public/styles/theme.style';

jest.mock('../RequestReset/RequestReset', () => () => <div>RequestReset</div>);

const arrage = (newProps = {}) => {
  const defaultProps = {};
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <ForgotPassDialog {...mockProps} />
    </ThemeProvider>
  );

  const modalLinkText = 'Forgot password?';
  const modalTitleText = 'Request a password reset';
  const modalLink = () => result.queryByText(modalLinkText);
  const modalTitle = () => result.queryByText(modalTitleText);
  const forgotPassModal = () => result.queryByRole('dialog');

  const clickModalLink = () => fireEvent.click(modalLink());

  return { ...result, modalLink, modalTitle, forgotPassModal, clickModalLink };
};

describe('ForgotPassDialog', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.modalLink()).toBeInTheDocument();
  });

  it('renders ForgotPassModal on click', () => {
    const com = arrage();

    expect(com.forgotPassModal()).not.toBeInTheDocument();

    com.clickModalLink();

    expect(com.modalTitle()).toBeInTheDocument();
    expect(com.forgotPassModal()).toBeInTheDocument();
  });
});
