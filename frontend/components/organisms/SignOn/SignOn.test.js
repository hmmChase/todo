// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import SignOn from './SignOn';
// import theme from '../../../public/styles/theme.style';

// jest.mock('../SignIn/SignIn', () => () => <div>SignIn</div>);
// jest.mock('../SignUp/SignUp', () => () => <div>SignUp</div>);

// const setup = (updatedProps = {}) => {
//   const initialProps = {};
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <SignOn {...mergedProps} />
//     </ThemeProvider>
//   );

//   const ideaboxImg = () => result.queryByAltText('ideabox');
//   const title = () => result.queryByText('Starter');
//   const signIn = () => result.queryByText('SignIn');
//   const signUp = () => result.queryByText('SignUp');

//   return { ...result, ideaboxImg, title, signIn, signUp };
// };

// describe('SignOn', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.ideaboxImg()).toBeInTheDocument();
//     expect(utils.title()).toBeInTheDocument();
//     expect(utils.signIn()).toBeInTheDocument();
//     expect(utils.signUp()).toBeInTheDocument();
//   });
// });
