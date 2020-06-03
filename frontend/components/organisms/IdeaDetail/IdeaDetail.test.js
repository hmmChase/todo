import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import IdeaDetail from './IdeaDetail';
import {
  MOCK_CURRENT_USER_IDEA,
  MOCK_ERROR_CURRENT_USER_IDEA,
} from '../../../__tests__/__mocks__/graphql/idea';
import theme from '../../../public/styles/theme.style';

jest.mock('../IdeaCardInput/IdeaCardInput', () => () => (
  <div>IdeaCardInput</div>
));

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = { ideaId: '1' };
  const defaultQueries = [MOCK_CURRENT_USER_IDEA];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaDetail {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const backBtn = () => result.queryByLabelText('back button');
  const displayLoading = () => result.getByText('Loading...');
  const IdeaCardInput = () => result.getByText('IdeaCardInput');
  const displayError = () => result.getByText('Network error: mock error');

  return { ...result, backBtn, displayLoading, IdeaCardInput, displayError };
};

describe('IdeaDetail', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.backBtn()).toBeInTheDocument();
    expect(com.displayLoading()).toBeInTheDocument();
  });

  it('renders IdeaCardInput on success', async () => {
    const com = arrage();

    await act(() => new Promise(setTimeout));

    expect(com.IdeaCardInput()).toBeInTheDocument();
  });

  it('renders DisplayError on error', async () => {
    const com = arrage({}, [MOCK_ERROR_CURRENT_USER_IDEA]);

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });
});
