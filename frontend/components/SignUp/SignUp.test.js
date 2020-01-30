import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import SignUp from './SignUp';
import {
  MOCK_SIGN_UP,
  MOCK_ERROR_SIGN_UP
} from '../../__tests__/__mocks__/graphql/user';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_SIGN_UP];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SignUp {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const title = () => result.queryByText('Create a new Account');
  const inputEmail = () => result.queryByLabelText('Email');
  const inputPassword = () => result.queryByLabelText('Password');
  const inputConfirmPassword = () =>
    result.queryByLabelText('Confirm Password');
  const passList = () => result.queryByTestId('passList');
  const submitBtn = () => result.queryByLabelText('submit button');
  const displayError = () => result.queryByText('Network error: mock error');

  const changeInputEmail = value =>
    fireEvent.change(inputEmail(), { target: { value } });
  const changeInputPassword = value =>
    fireEvent.change(inputPassword(), { target: { value } });
  const changeInputConfirmPassword = value =>
    fireEvent.change(inputConfirmPassword(), { target: { value } });
  const clickSubmitBtn = () => fireEvent.click(submitBtn());

  return {
    ...result,
    title,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    passList,
    submitBtn,
    displayError,
    changeInputEmail,
    changeInputPassword,
    changeInputConfirmPassword,
    clickSubmitBtn
  };
};

describe('SignUp', () => {
  afterEach(cleanup);

  it('renders components', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
    expect(com.inputEmail()).toBeInTheDocument();
    expect(com.inputPassword()).toBeInTheDocument();
    expect(com.inputConfirmPassword()).toBeInTheDocument();
    expect(com.passList()).toBeInTheDocument();
    expect(com.submitBtn()).toBeInTheDocument();
  });

  it('renders error message on click if error', async () => {
    const com = arrage({}, [MOCK_ERROR_SIGN_UP]);

    com.changeInputEmail('mock@email.com');
    com.changeInputPassword('Mockpass#3');
    com.changeInputConfirmPassword('Mockpass#3');

    com.clickSubmitBtn();

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });
});
