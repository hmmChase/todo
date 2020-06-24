// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import PassReqList from './PassReqList';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}) => {
//   const initialProps = {};
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <PassReqList {...mergedProps} />
//     </ThemeProvider>
//   );

//   const passReqList = result.queryByText('PassReqList');

//   return { ...result, passReqList };
// };

// describe('PassReqList', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.passReqList).toBeInTheDocument();
//   });
// });
