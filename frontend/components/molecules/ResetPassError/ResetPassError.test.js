// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import ResetPassError from './ResetPassError';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}) => {
//   const initialProps = {};
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <ResetPassError {...mergedProps} />
//     </ThemeProvider>
//   );

//   const resetPassError = result.queryByText('ResetPassError');

//   return { ...result, resetPassError };
// };

// describe('ResetPassError', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.resetPassError).toBeInTheDocument();
//   });
// });
