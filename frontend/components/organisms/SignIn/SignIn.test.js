import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import SignIn from './SignIn';
import {
  MOCK_SIGN_IN,
  MOCK_ERROR_SIGN_IN,
} from '../../../__tests__/__mocks__/graphql/user';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_SIGN_IN];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SignIn {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const title = () => result.queryByTestId('SignInTitle');
  const inputEmail = () => result.queryByLabelText('Email');
  const inputPassword = () => result.queryByLabelText('Password');
  const submitBtn = () => result.queryByLabelText('submit button');
  const displayError = () => result.queryByText('Network error: mock error');

  const changeInputEmail = (value) =>
    fireEvent.change(inputEmail(), { target: { value } });
  const changeInputPassword = (value) =>
    fireEvent.change(inputPassword(), { target: { value } });
  const clickSubmitBtn = () => fireEvent.click(submitBtn());

  return {
    ...result,
    title,
    inputEmail,
    inputPassword,
    submitBtn,
    displayError,
    changeInputEmail,
    changeInputPassword,
    clickSubmitBtn,
  };
};

describe('SignIn', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.title()).toBeInTheDocument();
    expect(com.inputEmail()).toBeInTheDocument();
    expect(com.inputPassword()).toBeInTheDocument();
    expect(com.submitBtn()).toBeInTheDocument();
  });

  it('renders error message on click if error', async () => {
    const com = arrage({}, [MOCK_ERROR_SIGN_IN]);

    com.changeInputEmail('mock@email.com');
    com.changeInputPassword('Mockpass#3');

    com.clickSubmitBtn();

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });
});

// old SignIn
// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import SignIn from './SignIn';
// import theme from '../../../public/styles/theme.style';

// jest.mock('../SignInForm/SignInForm', () => () => <div>SignInForm</div>);

// const arrage = (newProps = {}) => {
//   const defaultProps = {};
//   const mockProps = { ...defaultProps, ...newProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <SignIn {...mockProps} />
//     </ThemeProvider>
//   );

//   const signInForm = () => result.queryByText('SignInForm');
//   const forgotPassDialog = () => result.queryByText('Forgot password?');

//   return { ...result, signInForm, forgotPassDialog };
// };

// describe('SignIn', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const com = arrage();

//     expect(com.signInForm()).toBeInTheDocument();
//     expect(com.forgotPassDialog()).toBeInTheDocument();
//   });
// });
