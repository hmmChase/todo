// import {
//   render,
//   cleanup,
//   prettyDOM,
//   fireEvent,
//   act,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/react-testing';
// import { ThemeProvider } from 'styled-components';
// import Ideas from './Ideas';
// import {
//   MOCK_CURRENT_USER_PAGINATED_IDEAS,
//   MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY,
//   MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS,
// } from '../../../__tests__/__mocks__/graphql/idea';
// import theme from '../../../public/styles/theme.style';

// const setup = (updatedProps = {}, updatedQueries = []) => {
//   const initialProps = {};
//   const initialQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS];
//   const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
//   const mergedProps = { ...initialProps, ...updatedProps };

//   const result = render(
//     <MockedProvider mocks={mergedQueries} addTypename={false}>
//       <ThemeProvider theme={theme}>
//         <Ideas {...mergedProps} />
//       </ThemeProvider>
//     </MockedProvider>
//   );

//   const displayLoading = () => result.queryByText('Loading...');
//   const displayError = () => result.queryByText('Network error: mock error');
//   const ideas = () => result.queryAllByLabelText('idea input');
//   const showMoreBtn = () => result.queryByLabelText('load more button');
//   const addIdeaMessage = () => result.queryByText('Add an Idea!');

//   return {
//     ...result,
//     displayLoading,
//     ideas,
//     displayError,
//     showMoreBtn,
//     addIdeaMessage,
//   };
// };

// describe('Ideas', () => {
//   afterEach(cleanup);

//   it('renders elements', () => {
//     const utils = setup();

//     expect(utils.displayLoading()).toBeInTheDocument();
//   });

//   it('renders DisplayError on error', async () => {
//     const utils = setup({}, [MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS]);

//     await act(() => new Promise(setTimeout));

//     expect(utils.displayError()).toBeInTheDocument();
//   });

//   it('renders elements after loaded', async () => {
//     const utils = setup();

//     await act(() => new Promise(setTimeout));

//     expect(utils.ideas()).toHaveLength(5);
//     expect(utils.showMoreBtn()).toBeInTheDocument();
//   });

//   it('doesnt render showMoreBtn if hasNextPage is false', async () => {
//     const utils = setup({}, [MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY]);

//     await act(() => new Promise(setTimeout));

//     expect(utils.showMoreBtn()).not.toBeInTheDocument();
//   });

//   it('renders addIdeaMessage if no ideas', async () => {
//     const utils = setup({}, [MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY]);

//     await act(() => new Promise(setTimeout));

//     expect(utils.addIdeaMessage()).toBeInTheDocument();
//   });
// });
