// import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import IdeaCardForm from './IdeaCardForm';
// import {
//   MOCK_CURRENT_USER_PAGINATED_IDEAS,
//   MOCK_CREATE_IDEA,
// } from '../../../__tests__/__mocks__/graphql/idea';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {};
//   const initialQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_CREATE_IDEA];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <IdeaCardForm {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const inputTextArea = () => result.queryByLabelText('idea input');
//   const boxImg = () => result.queryByAltText('ideabox');
//   const submitBtn = () => result.queryByLabelText('submit idea');

//   return { ...result, inputTextArea, boxImg, submitBtn };
// };

// describe('IdeaCardForm', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.inputTextArea()).toBeInTheDocument();
//     expect(utils.boxImg()).toBeInTheDocument();
//     expect(utils.submitBtn()).toBeInTheDocument();
//   });
// });
