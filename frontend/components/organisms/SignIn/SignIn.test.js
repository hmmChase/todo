// import {
//   render,
//   cleanup,
//   prettyDOM,
//   fireEvent,
//   act,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import SignIn from './SignIn';
// import {
//   MOCK_SIGN_IN,
//   MOCK_ERROR_SIGN_IN,
// } from '../../../__tests__/__mocks__/graphql/user';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {};
//   const initialQueries = [MOCK_SIGN_IN];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <SignIn {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const title = () => result.queryByTestId('SignInTitle');
//   const inputEmail = () => result.queryByLabelText('Email');
//   const inputPassword = () => result.queryByLabelText('Password');
//   const submitBtn = () => result.queryByLabelText('submit button');
//   const displayError = () => result.queryByText('Network error: mock error');

//   const changeInputEmail = (value) =>
//     fireEvent.change(inputEmail(), { target: { value } });
//   const changeInputPassword = (value) =>
//     fireEvent.change(inputPassword(), { target: { value } });
//   const clickSubmitBtn = () => fireEvent.click(submitBtn());

//   return {
//     ...result,
//     title,
//     inputEmail,
//     inputPassword,
//     submitBtn,
//     displayError,
//     changeInputEmail,
//     changeInputPassword,
//     clickSubmitBtn,
//   };
// };

// describe('SignIn', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.title()).toBeInTheDocument();
//     expect(utils.inputEmail()).toBeInTheDocument();
//     expect(utils.inputPassword()).toBeInTheDocument();
//     expect(utils.submitBtn()).toBeInTheDocument();
//   });

//   it('renders error message on click if error', async () => {
//     const utils = setup({}, [MOCK_ERROR_SIGN_IN]);

//     utils.changeInputEmail('mock@email.com');
//     utils.changeInputPassword('Mockpass#3');

//     utils.clickSubmitBtn();

//     await act(() => new Promise(setTimeout));

//     expect(utils.displayError()).toBeInTheDocument();
//   });
// });

// // old SignIn
// // import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// // import { ThemeProvider } from 'styled-components';
// // import SignIn from './SignIn';
// // import theme from '../../../public/styles/theme.style';

// // jest.mock('../SignInForm/SignInForm', () => () => <div>SignInForm</div>);

// // const setup = (updatedProps = {}) => {
// //   const initialProps = {};
// //   const mergedProps = { ...initialProps, ...updatedProps };

// //   const result = render(
// //     <ThemeProvider theme={theme}>
// //       <SignIn {...mergedProps} />
// //     </ThemeProvider>
// //   );

// //   const signInForm = () => result.queryByText('SignInForm');
// //   const forgotPassDialog = () => result.queryByText('Forgot password?');

// //   return { ...result, signInForm, forgotPassDialog };
// // };

// // describe('SignIn', () => {
// //   afterEach(cleanup);

// //   it('renders elements', () => {
// //     const utils = setup();

// //     expect(utils.signInForm()).toBeInTheDocument();
// //     expect(utils.forgotPassDialog()).toBeInTheDocument();
// //   });
// // });
