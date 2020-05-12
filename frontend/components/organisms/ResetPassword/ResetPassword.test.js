import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import ResetPassword from './ResetPassword';
import {
  MOCK_RESET_PASSWORD,
  MOCK_RESET_RESET_PASSWORD,
} from '../../../__tests__/__mocks__/graphql/user';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {
    resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
    resetTokenExpiry: (Date.now() + 3600000).toString(),
  };
  const defaultQueries = [MOCK_RESET_PASSWORD];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <ResetPassword {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const generalErrorText = 'Error: Please submit a new password reset request.';
  const expiredErrorText =
    'Your reset request is expired. Please submit a new one.';
  const successMessageText = 'Your password has been successfully changed.';
  const displayGeneralError = () => result.queryByText(generalErrorText);
  const displayExpiredError = () => result.queryByText(expiredErrorText);
  const displayError = () => result.queryByText('Network error: mock error');
  const inputPassword = () => result.queryByLabelText('New password');
  const inputConfirmPassword = () =>
    result.queryByLabelText('Confirm new password');
  const passList = () => result.queryByTestId('passList');
  const submitBtn = () => result.queryByLabelText('submit button');
  const successMessage = () => result.queryByText(successMessageText);

  const changeInputPassword = (value) =>
    fireEvent.change(inputPassword(), { target: { value } });
  const changeInputConfirmPassword = (value) =>
    fireEvent.change(inputConfirmPassword(), { target: { value } });
  const clickSubmitBtn = () => fireEvent.click(submitBtn());

  return {
    ...result,
    displayGeneralError,
    displayExpiredError,
    displayError,
    inputPassword,
    inputConfirmPassword,
    passList,
    changeInputPassword,
    changeInputConfirmPassword,
    submitBtn,
    successMessage,
    clickSubmitBtn,
  };
};

describe('ResetPassword', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.inputPassword()).toBeInTheDocument();
    expect(com.inputConfirmPassword()).toBeInTheDocument();
    expect(com.passList()).toBeInTheDocument();
    expect(com.submitBtn()).toBeInTheDocument();
  });

  it('renders general token error message if token missing', () => {
    const com = arrage({ resetToken: '' });

    expect(com.displayGeneralError()).toBeInTheDocument();
  });

  it('renders general token error message if token expiry missing', () => {
    const com = arrage({ resetTokenExpiry: '' });

    expect(com.displayGeneralError()).toBeInTheDocument();
  });

  it('renders expired token error message if token expired', () => {
    const com = arrage({ resetTokenExpiry: '1' });

    expect(com.displayExpiredError()).toBeInTheDocument();
  });

  it('renders success message on click if successful', async () => {
    const com = arrage();

    com.changeInputPassword('Mockpass#3');
    com.changeInputConfirmPassword('Mockpass#3');

    com.clickSubmitBtn();

    await act(() => new Promise(setTimeout));

    expect(com.successMessage()).toBeInTheDocument();
  });

  it('renders error message on click if error', async () => {
    const com = arrage({}, [MOCK_RESET_RESET_PASSWORD]);

    com.changeInputPassword('Mockpass#3');
    com.changeInputConfirmPassword('Mockpass#3');

    com.clickSubmitBtn();

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });
});
