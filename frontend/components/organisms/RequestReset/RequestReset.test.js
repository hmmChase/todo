import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import RequestReset from './RequestReset';
import {
  MOCK_REQUEST_RESET,
  MOCK_ERROR_REQUEST_RESET
} from '../../../__tests__/__mocks__/graphql/user';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_REQUEST_RESET];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <RequestReset {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const displayLoading = () => result.queryByText('Loading...');
  const displayError = () => result.queryByText('Network error: mock error');
  const inputEmail = () => result.queryByLabelText('Email');
  const submitBtn = () => result.queryByLabelText('submit button');
  const successMessage = () =>
    result.queryByText('Check your email for a reset link.');
  const changeInputEmail = value =>
    fireEvent.change(inputEmail(), { target: { value } });
  const clickSubmitBtn = () => fireEvent.click(submitBtn());

  return {
    ...result,
    inputEmail,
    displayLoading,
    displayError,
    submitBtn,
    successMessage,
    changeInputEmail,
    clickSubmitBtn
  };
};

describe('RequestReset', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.inputEmail()).toBeInTheDocument();
    expect(com.submitBtn()).toBeInTheDocument();
  });

  it('renders successMessage on click if successful', async () => {
    const com = arrage();

    com.changeInputEmail('mock@email.com');

    com.clickSubmitBtn();

    await act(() => new Promise(setTimeout));

    expect(com.successMessage()).toBeInTheDocument();
  });

  it('renders errorMessage on click if error', async () => {
    const com = arrage({}, [MOCK_ERROR_REQUEST_RESET]);

    com.changeInputEmail('mock@email.com');

    com.clickSubmitBtn();

    await act(() => new Promise(setTimeout));

    expect(com.displayError()).toBeInTheDocument();
  });
});
