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
  MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

jest.mock('../LoadMoreBtn/LoadMoreBtn', () => () => <div>LoadMoreBtn</div>);

// jest.mock('../IdeaCardList/IdeaCardList', () => () => <div>IdeaCardList</div>);

const arrage = (props = {}, error = false) => {
  const defaultProps = { ...props };
  const defaultQueries = error
    ? [MOCK_ERROR_CURRENT_USER_PAGINATED_IDEAS]
    : [MOCK_CURRENT_USER_PAGINATED_IDEAS];

  const utils = render(
    <MockedProvider mocks={defaultQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <Ideas {...defaultProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const displayLoading = () => utils.getByText('Loading...');
  const displayError = () => utils.getByText('Network error: mock error');
  const ideas = () => utils.queryAllByLabelText('idea input');

  return { ...utils, displayLoading, ideas, displayError };
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
    const com = arrage({}, true);

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });

  it('renders correct amt of ideas', async () => {
    const com = arrage();

    await act(() => new Promise(setTimeout));

    expect(com.ideas()).toHaveLength(6);
  });
});
