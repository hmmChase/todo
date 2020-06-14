// import {
//   render,
//   cleanup,
//   prettyDOM,
//   fireEvent,
//   act,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import RequestReset from './RequestReset';
// import {
//   MOCK_REQUEST_RESET,
//   MOCK_ERROR_REQUEST_RESET,
// } from '../../../__tests__/__mocks__/graphql/user';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {};
//   const initialQueries = [MOCK_REQUEST_RESET];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <RequestReset {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const displayLoading = () => result.queryByText('Loading...');
//   const displayError = () => result.queryByText('Network error: mock error');
//   const inputEmail = () => result.queryByLabelText('Email');
//   const submitBtn = () => result.queryByLabelText('submit button');
//   const successMessage = () =>
//     result.queryByText('Check your email for a reset link.');
//   const changeInputEmail = (value) =>
//     fireEvent.change(inputEmail(), { target: { value } });
//   const clickSubmitBtn = () => fireEvent.click(submitBtn());

//   return {
//     ...result,
//     inputEmail,
//     displayLoading,
//     displayError,
//     submitBtn,
//     successMessage,
//     changeInputEmail,
//     clickSubmitBtn,
//   };
// };

// describe('RequestReset', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.inputEmail()).toBeInTheDocument();
//     expect(utils.submitBtn()).toBeInTheDocument();
//   });

//   it('renders successMessage on click if successful', async () => {
//     const utils = setup();

//     utils.changeInputEmail('mock@email.com');

//     utils.clickSubmitBtn();

//     await act(() => new Promise(setTimeout));

//     expect(utils.successMessage()).toBeInTheDocument();
//   });

//   it('renders errorMessage on click if error', async () => {
//     const utils = setup({}, [MOCK_ERROR_REQUEST_RESET]);

//     utils.changeInputEmail('mock@email.com');

//     utils.clickSubmitBtn();

//     await act(() => new Promise(setTimeout));

//     expect(utils.displayError()).toBeInTheDocument();
//   });
// });
