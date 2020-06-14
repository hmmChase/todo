import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act,
  wait,
  waitFor,
  screen,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MockedProvider } from '@apollo/react-testing';
import { MOCK_CURRENT_USER } from '../../__tests__/__mocks__/graphql/user';
import {
  MOCK_CURRENT_USER_IDEA,
  MOCK_UPDATE_IDEA,
  // MOCK_ERROR_CURRENT_USER_IDEA,
} from '../../__tests__/__mocks__/graphql/idea';
import IdeaPage from '../../pages/idea/[id]';
import theme from '../../public/styles/theme.style';

// jest.mock('../../components/organisms/IdeaDetail/IdeaDetail', () => () => (
//   <div>IdeaDetail</div>
// ));

const arrage = (newProps = {}, newQueries = []) => {
  // const defaultProps = {};
  // const mockProps = { ...defaultProps, ...newProps };

  const defaultProps = { id: '342jkhl523k5j35' };
  const defaultQueries = [
    MOCK_CURRENT_USER,
    MOCK_CURRENT_USER_IDEA,
    MOCK_UPDATE_IDEA,
  ];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaPage {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  // const inputField = () => result.queryByLabelText('Input Field');
  // const submitBtn = () => result.queryByLabelText('Submit');

  // const backBtn = () => result.queryByLabelText('back button');
  // const displayLoading = () => result.getByText('Loading...');
  // const IdeaCardInput = () => result.getByText('IdeaCardInput');
  // const displayError = () => result.getByText('Network error: mock error');

  // const changeInputField = value =>
  //   fireEvent.change(inputField(), { target: { value } });
  // const clickSubmitBtn = () => fireEvent.click(submitBtn());

  return {
    ...result,
    // inputField,
    // submitBtn,
    // changeInputField,
    // clickSubmitBtn
  };
};

// cant get past loading state
describe('IdeaPage', () => {
  afterEach(cleanup);

  it.skip('renders components', async () => {
    // await waitFor(async () => await new Promise(setTimeout));

    // const com = arrage();

    await act(() => new Promise(setTimeout));

    const result = render(
      <MockedProvider
        mocks={[MOCK_CURRENT_USER, MOCK_CURRENT_USER_IDEA, MOCK_UPDATE_IDEA]}
        addTypename={false}
      >
        <ThemeProvider theme={theme}>
          <IdeaPage id='342jkhl523k5j35' />
        </ThemeProvider>
      </MockedProvider>
    );

    // act(() => new Promise(setTimeout));

    // await waitFor(async () => await new Promise(setTimeout));

    // act(() => arrage());

    // act(() => result);

    // await waitFor(() => screen);

    await act(() => new Promise(setTimeout));

    // const result = rerender(
    //   <MockedProvider
    //     mocks={[MOCK_CURRENT_USER, MOCK_CURRENT_USER_IDEA, MOCK_UPDATE_IDEA]}
    //     addTypename={false}
    //   >
    //     <ThemeProvider theme={theme}>
    //       <IdeaPage id='342jkhl523k5j35' />
    //     </ThemeProvider>
    //   </MockedProvider>
    // );

    result.debug();

    // console.log(prettyDOM(com.baseElement, 10000));

    // expect(com.inputField()).toBeInTheDocument();
    // expect(com.submitBtn()).toBeInTheDocument();
  });
});
