// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import Header from './Header';
// import theme from '../../../public/styles/theme.style';

// jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

// const setup = (updatedProps = {}) => {
//   const titleText = '3jd9k4jkf8n4';
//   const initialProps = { ideaId: titleText };
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <ThemeProvider theme={theme}>
//       <Header {...mergedProps} />
//     </ThemeProvider>
//   );

//   const title = () => result.queryByText(titleText);
//   const signOutBtn = () => result.queryByText('SignOutBtn');

//   return { ...result, title, signOutBtn };
// };

// describe('Header', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.title()).toBeInTheDocument();
//     expect(utils.signOutBtn()).toBeInTheDocument();
//   });
// });

// // import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// // import { ThemeProvider } from 'styled-components';
// // import TopMain from './TopMain';
// // import theme from '../../../public/styles/theme.style';

// // jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);
// // jest.mock('../IdeaCardForm/IdeaCardForm', () => () => <div>IdeaCardForm</div>);

// // const setup = (updatedProps = {}) => {
// //   const initialProps = {};
// //   const mergedProps = { ...initialProps, ...updatedProps };

// //   const result = render(
// //     <ThemeProvider theme={theme}>
// //       <TopMain {...mergedProps} />
// //     </ThemeProvider>
// //   );

// //   const title = () => result.queryByText('Starter');
// //   const signOutBtn = () => result.queryByText('SignOutBtn');
// //   const ideaCardForm = () => result.queryByText('IdeaCardForm');

// //   return { ...result, title, signOutBtn, ideaCardForm };
// // };

// // describe('TopMain', () => {
// //   afterEach(cleanup);

// //   it('renders elements', () => {
// //     const utils = setup();

// //     expect(utils.title()).toBeInTheDocument();
// //     expect(utils.signOutBtn()).toBeInTheDocument();
// //     expect(utils.ideaCardForm()).toBeInTheDocument();
// //   });
// // });

// // import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// // import { ThemeProvider } from 'styled-components';
// // import TopDetail from './TopDetail';
// // import theme from '../../../public/styles/theme.style';

// // jest.mock('../SignOutBtn/SignOutBtn', () => () => <div>SignOutBtn</div>);

// // const setup = (updatedProps = {}) => {
// //   const titleText = '3jd9k4jkf8n4';
// //   const initialProps = { ideaId: titleText };
// //   const mergedProps = { ...initialProps, ...updatedProps };

// //   const result = render(
// //     <ThemeProvider theme={theme}>
// //       <TopDetail {...mergedProps} />
// //     </ThemeProvider>
// //   );

// //   const title = () => result.queryByText(titleText);
// //   const signOutBtn = () => result.queryByText('SignOutBtn');

// //   return { ...result, title, signOutBtn };
// // };

// // describe('TopDetail', () => {
// //   afterEach(cleanup);

// //   it('renders elements', () => {
// //     const utils = setup();

// //     expect(utils.title()).toBeInTheDocument();
// //     expect(utils.signOutBtn()).toBeInTheDocument();
// //   });
// // });
