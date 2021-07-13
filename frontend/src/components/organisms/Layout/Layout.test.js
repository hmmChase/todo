// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import Layout from './Layout';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}) => {
//   const initialProps = { header: 'mock header', content: 'mock content' };
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <Layout {...mergedProps} />
//     </ThemeProvider>
//   );

//   const antHeader = () => result.queryByText(mergedProps.header);
//   const antContent = () => result.queryByText(mergedProps.content);
//   const antFooter = () => result.queryByText('Footer');

//   return { ...result, antHeader, antContent, antFooter };
// };

// describe('Layout', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.antHeader()).toBeInTheDocument();
//     expect(utils.antContent()).toBeInTheDocument();
//     expect(utils.antFooter()).toBeInTheDocument();
//   });
// });
