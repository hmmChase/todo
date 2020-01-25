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
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const utils = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <Ideas {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const displayLoading = () => utils.queryByText('Loading...');
  const displayError = () => utils.queryByText('Network error: mock error');
  const ideas = () => utils.queryAllByLabelText('idea input');
  const loadMoreBtn = () => utils.queryByLabelText('load more button');
  const addIdeaMessage = () => utils.queryByText('Add an Idea!');

  return {
    ...utils,
    displayLoading,
    ideas,
    displayError,
    loadMoreBtn,
    addIdeaMessage
  };
};

describe('Ideas', () => {
  afterEach(cleanup);

  it('renders Ideas', () => {
    const com = arrage();

    expect(com.baseElement).toBeInTheDocument();
  });

  it('renders DisplayLoading when loading', () => {
    const com = arrage();

    expect(com.displayLoading()).toBeInTheDocument();
  });

  it('renders DisplayError on error', async () => {
    const com = arrage({}, [MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS]);

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });

  it('renders correct amt of ideas', async () => {
    const com = arrage();

    await act(() => new Promise(setTimeout));

    expect(com.ideas()).toHaveLength(5);
  });

  it('renders LoadMoreBtn if hasNextPage is true', async () => {
    const com = arrage();

    await act(() => new Promise(setTimeout));

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
