// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import Footer from './Footer';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}) => {
//   const initialProps = {};
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <Footer {...mergedProps} />
//     </ThemeProvider>
//   );

//   const footer = result.queryByText('Footer');

//   return { ...result, footer };
// };

// describe('Footer', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.footer).toBeInTheDocument();
//   });
// });
