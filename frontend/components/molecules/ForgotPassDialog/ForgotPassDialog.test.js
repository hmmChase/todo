// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import ForgotPassDialog from './ForgotPassDialog';
// import theme from '../../../public/styles/theme.style';

// jest.mock('../RequestReset/RequestReset', () => () => <div>RequestReset</div>);

// const setup = (updatedProps = {}) => {
//   const initialProps = {};
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <ForgotPassDialog {...mergedProps} />
//     </ThemeProvider>
//   );

//   const modalLinkText = 'Forgot password?';
//   const modalTitleText = 'Request a password reset';
//   const modalLink = () => result.queryByText(modalLinkText);
//   const modalTitle = () => result.queryByText(modalTitleText);
//   const forgotPassModal = () => result.queryByRole('dialog');

//   const clickModalLink = () => fireEvent.click(modalLink());

//   return { ...result, modalLink, modalTitle, forgotPassModal, clickModalLink };
// };

// describe('ForgotPassDialog', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.modalLink()).toBeInTheDocument();
//   });

//   it('renders ForgotPassModal on click', () => {
//     const utils = setup();

//     expect(utils.forgotPassModal()).not.toBeInTheDocument();

//     utils.clickModalLink();

//     expect(utils.modalTitle()).toBeInTheDocument();
//     expect(utils.forgotPassModal()).toBeInTheDocument();
//   });
// });
