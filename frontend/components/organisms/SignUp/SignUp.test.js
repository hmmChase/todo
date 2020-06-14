// import {
//   render,
//   cleanup,
//   prettyDOM,
//   fireEvent,
//   act,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import SignUp from './SignUp';
// import {
//   MOCK_SIGN_UP,
//   MOCK_ERROR_SIGN_UP,
// } from '../../../__tests__/__mocks__/graphql/user';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {};
//   const initialQueries = [MOCK_SIGN_UP];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <SignUp {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const title = () => result.queryByText('Create a new Account');
//   const inputEmail = () => result.queryByLabelText('Email');
//   const inputPassword = () => result.queryByLabelText('Password');
//   const inputConfirmPassword = () =>
//     result.queryByLabelText('Confirm Password');
//   const passList = () => result.queryByTestId('passList');
//   const submitBtn = () => result.queryByLabelText('submit button');
//   const displayError = () => result.queryByText('Network error: mock error');

//   const changeInputEmail = (value) =>
//     fireEvent.change(inputEmail(), { target: { value } });
//   const changeInputPassword = (value) =>
//     fireEvent.change(inputPassword(), { target: { value } });
//   const changeInputConfirmPassword = (value) =>
//     fireEvent.change(inputConfirmPassword(), { target: { value } });
//   const clickSubmitBtn = () => fireEvent.click(submitBtn());

//   return {
//     ...result,
//     title,
//     inputEmail,
//     inputPassword,
//     inputConfirmPassword,
//     passList,
//     submitBtn,
//     displayError,
//     changeInputEmail,
//     changeInputPassword,
//     changeInputConfirmPassword,
//     clickSubmitBtn,
//   };
// };

// describe('SignUp', () => {
//   afterEach(cleanup);

//   it('renders components', () => {
//     const utils = setup();

//     expect(utils.title()).toBeInTheDocument();
//     expect(utils.inputEmail()).toBeInTheDocument();
//     expect(utils.inputPassword()).toBeInTheDocument();
//     expect(utils.inputConfirmPassword()).toBeInTheDocument();
//     expect(utils.passList()).toBeInTheDocument();
//     expect(utils.submitBtn()).toBeInTheDocument();
//   });

//   it('renders error message on click if error', async () => {
//     const utils = setup({}, [MOCK_ERROR_SIGN_UP]);

//     utils.changeInputEmail('mock@email.com');
//     utils.changeInputPassword('Mockpass#3');
//     utils.changeInputConfirmPassword('Mockpass#3');

//     utils.clickSubmitBtn();

//     await act(() => new Promise(setTimeout));

//     expect(utils.displayError()).toBeInTheDocument();
//   });
// });
