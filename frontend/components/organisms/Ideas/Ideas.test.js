import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import Ideas from './Ideas';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY,
  MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS
} from '../../../__tests__/__mocks__/graphql/idea';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <Ideas {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const displayLoading = () => result.queryByText('Loading...');
  const displayError = () => result.queryByText('Network error: mock error');
  const ideas = () => result.queryAllByLabelText('idea input');
  const loadMoreBtn = () => result.queryByLabelText('load more button');
  const addIdeaMessage = () => result.queryByText('Add an Idea!');

  return {
    ...result,
    displayLoading,
    ideas,
    displayError,
    loadMoreBtn,
    addIdeaMessage
  };
};

describe('Ideas', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.displayLoading()).toBeInTheDocument();
  });

  it('renders DisplayError on error', async () => {
    const com = arrage({}, [MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS]);

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });

  it('renders elements after loaded', async () => {
    const com = arrage();

    await act(() => new Promise(setTimeout));

    expect(com.ideas()).toHaveLength(5);
    expect(com.loadMoreBtn()).toBeInTheDocument();
  });

  it('doesnt render LoadMoreBtn if hasNextPage is false', async () => {
    const com = arrage({}, [MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY]);

    await act(() => new Promise(setTimeout));

    expect(com.loadMoreBtn()).not.toBeInTheDocument();
  });

  it('renders addIdeaMessage if no ideas', async () => {
    const com = arrage({}, [MOCK_CURRENT_USER_PAGINATED_IDEAS_EMPTY]);

    await act(() => new Promise(setTimeout));

    expect(com.addIdeaMessage()).toBeInTheDocument();
  });
});
