import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import IdeaDetail from './IdeaDetail';
import {
  MOCK_CURRENT_USER_IDEA,
  MOCK_ERROR_CURRENT_USER_IDEA
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

jest.mock('../IdeaInput/IdeaInput', () => () => <div>IdeaInput</div>);

const arrage = (props = {}, error = false) => {
  const defaultProps = { ideaId: '1', ...props };
  const defaultQueries = error
    ? [MOCK_ERROR_CURRENT_USER_IDEA]
    : [MOCK_CURRENT_USER_IDEA];

  const utils = render(
    <MockedProvider mocks={defaultQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaDetail {...defaultProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const displayLoading = () => utils.getByText('Loading...');
  const ideaInput = () => utils.getByText('IdeaInput');
  const displayError = () => utils.getByText('Network error: mock error');

  return { ...utils, displayLoading, ideaInput, displayError };
};

describe('IdeaDetail', () => {
  afterEach(cleanup);

  it('renders IdeaDetail', () => {
    const com = arrage();

    expect(com.baseElement).toBeInTheDocument();
  });

  it('renders DisplayLoading when loading', () => {
    const com = arrage();

    expect(com.displayLoading()).toBeInTheDocument();
  });

  it('renders IdeaInput on success', async () => {
    const com = arrage({}, false);

    await act(() => new Promise(setTimeout));

    expect(com.ideaInput()).toBeInTheDocument();
  });

  it('renders DisplayError on error', async () => {
    const com = arrage({}, true);

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });
});
