// import {
//   render,
//   cleanup,
//   prettyDOM,
//   fireEvent,
//   act,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import ResetPassword from './ResetPassword';
// import {
//   MOCK_RESET_PASSWORD,
//   MOCK_RESET_RESET_PASSWORD,
// } from '../../../__tests__/__mocks__/graphql/user';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {
//     resetToken: '4e4a8fb6e44ec32642cfa410243652f85885bc72',
//     resetTokenExpiry: (Date.now() + 3600000).toString(),
//   };
//   const initialQueries = [MOCK_RESET_PASSWORD];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <ResetPassword {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const generalErrorText = 'Error: Please submit a new password reset request.';
//   const expiredErrorText =
//     'Your reset request is expired. Please submit a new one.';
//   const successMessageText = 'Your password has been successfully changed.';
//   const displayGeneralError = () => result.queryByText(generalErrorText);
//   const displayExpiredError = () => result.queryByText(expiredErrorText);
//   const displayError = () => result.queryByText('Network error: mock error');
//   const inputPassword = () => result.queryByLabelText('New password');
//   const inputConfirmPassword = () =>
//     result.queryByLabelText('Confirm new password');
//   const passList = () => result.queryByTestId('passList');
//   const submitBtn = () => result.queryByLabelText('submit button');
//   const successMessage = () => result.queryByText(successMessageText);

//   const changeInputPassword = (value) =>
//     fireEvent.change(inputPassword(), { target: { value } });
//   const changeInputConfirmPassword = (value) =>
//     fireEvent.change(inputConfirmPassword(), { target: { value } });
//   const clickSubmitBtn = () => fireEvent.click(submitBtn());

//   return {
//     ...result,
//     displayGeneralError,
//     displayExpiredError,
//     displayError,
//     inputPassword,
//     inputConfirmPassword,
//     passList,
//     changeInputPassword,
//     changeInputConfirmPassword,
//     submitBtn,
//     successMessage,
//     clickSubmitBtn,
//   };
// };

// describe('ResetPassword', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.inputPassword()).toBeInTheDocument();
//     expect(utils.inputConfirmPassword()).toBeInTheDocument();
//     expect(utils.passList()).toBeInTheDocument();
//     expect(utils.submitBtn()).toBeInTheDocument();
//   });

//   it('renders general token error message if token missing', () => {
//     const utils = setup({ resetToken: '' });

//     expect(utils.displayGeneralError()).toBeInTheDocument();
//   });

//   it('renders general token error message if token expiry missing', () => {
//     const utils = setup({ resetTokenExpiry: '' });

//     expect(utils.displayGeneralError()).toBeInTheDocument();
//   });

//   it('renders expired token error message if token expired', () => {
//     const utils = setup({ resetTokenExpiry: '1' });

//     expect(utils.displayExpiredError()).toBeInTheDocument();
//   });

//   it('renders success message on click if successful', async () => {
//     const utils = setup();

//     utils.changeInputPassword('Mockpass#3');
//     utils.changeInputConfirmPassword('Mockpass#3');

//     utils.clickSubmitBtn();

//     await act(() => new Promise(setTimeout));

//     expect(utils.successMessage()).toBeInTheDocument();
//   });

//   it('renders error message on click if error', async () => {
//     const utils = setup({}, [MOCK_RESET_RESET_PASSWORD]);

//     utils.changeInputPassword('Mockpass#3');
//     utils.changeInputConfirmPassword('Mockpass#3');

//     utils.clickSubmitBtn();

//     await act(() => new Promise(setTimeout));

//     expect(utils.displayError()).toBeInTheDocument();
//   });
// });
