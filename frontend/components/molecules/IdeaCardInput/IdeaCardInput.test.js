// import {
//   render,
//   cleanup,
//   prettyDOM,
//   fireEvent,
//   act,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import IdeaCardInput from './IdeaCardInput';
// import { MOCK_UPDATE_IDEA } from '../../../__tests__/__mocks__/graphql/idea';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = { id: '1', content: 'mock content' };
//   const initialQueries = [MOCK_UPDATE_IDEA];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <IdeaCardInput {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const IdeaCardInput = () => result.queryByLabelText('idea input');

//   const changeIdeaCardInput = (value) =>
//     fireEvent.change(IdeaCardInput(), { target: { value } });

//   return { ...result, IdeaCardInput, changeIdeaCardInput };
// };

// describe('IdeaCardInput', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.IdeaCardInput()).toBeInTheDocument();
//   });

//   it('renders IdeaCardInput with updated content on change', async () => {
//     const utils = setup();

//     expect(utils.IdeaCardInput()).toHaveTextContent('mock content');

//     utils.changeIdeaCardInput('updated mock content');

//     expect(utils.IdeaCardInput()).toHaveTextContent('updated mock content');
//   });
// });
