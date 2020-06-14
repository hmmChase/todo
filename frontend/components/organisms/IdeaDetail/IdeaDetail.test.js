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

// jest.mock('../../molecules/IdeaCardInput/IdeaCardInput', () => () => (
//   <div>IdeaCardInput</div>
// ));

const setup = (updatedProps = {}, updatedQueries = []) => {
  const initialProps = { ideaId: '1' };
  const initialQueries = [MOCK_CURRENT_USER_IDEA];
  const mergedQueries = updatedQueries.length ? updatedQueries : initialQueries;
  const mergedProps = { ...initialProps, ...updatedProps };

  const result = render(
    <MockedProvider mocks={mergedQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaDetail {...mergedProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const backBtn = () => result.queryByLabelText('back');
  const displayLoading = () => result.getByText('Loading...');
  const IdeaCardInput = () => result.getByText('IdeaCardInput');
  const displayError = () => result.getByText('Network error: mock error');

  return { ...result, backBtn, displayLoading, IdeaCardInput, displayError };
};

describe('IdeaDetail', () => {
  afterEach(cleanup);

  it('renders elements', async () => {
    // const utils = setup();

    const result = render(
      <MockedProvider mocks={[MOCK_CURRENT_USER_IDEA]} addTypename={false}>
        <ThemeProvider theme={theme}>
          <IdeaDetail ideaId='342jkhl523k5j35' />
        </ThemeProvider>
      </MockedProvider>
    );

    await act(() => new Promise(setTimeout));

    result.debug();

    // expect(utils.backBtn()).toBeInTheDocument();
    // expect(utils.displayLoading()).toBeInTheDocument();
  });

  // it('renders IdeaCardInput on success', async () => {
  //   const utils = setup();

  //   await act(() => new Promise(setTimeout));

  //   expect(utils.IdeaCardInput()).toBeInTheDocument();
  // });

  // it('renders DisplayError on error', async () => {
  //   const utils = setup({}, [MOCK_ERROR_CURRENT_USER_IDEA]);

  //   await act(() => new Promise(setTimeout));

  //   expect(utils.displayError()).toBeInTheDocument();
  // });
});
