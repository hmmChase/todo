// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import SignOutBtn from './SignOutBtn';
// import { MOCK_SIGN_OUT } from '../../../__tests__/__mocks__/graphql/user';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {};
//   const initialQueries = [MOCK_SIGN_OUT];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const utils = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <SignOutBtn {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const signOutBtn = () => utils.queryByLabelText('sign out button');
//   const clickSignOutBtn = () => fireEvent.click(signOutBtn());

//   return { ...utils, signOutBtn, clickSignOutBtn };
// };

// describe('SignOutBtn', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.signOutBtn()).toBeInTheDocument();
//   });
// });
