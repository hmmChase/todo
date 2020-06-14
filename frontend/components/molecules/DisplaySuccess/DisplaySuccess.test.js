// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import DisplaySuccess from './DisplaySuccess';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}) => {
//   const successText = 'mock success message';
//   const initialProps = { message: successText };
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <DisplaySuccess {...mergedProps} />
//     </ThemeProvider>
//   );

//   const li = () => result.queryByText(successText);

//   return { ...result, li };
// };

// describe('DisplaySuccess', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.li()).toBeInTheDocument();
//   });
// });
