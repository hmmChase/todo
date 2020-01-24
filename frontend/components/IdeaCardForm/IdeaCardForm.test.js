import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import IdeaCardForm from './IdeaCardForm';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_CREATE_IDEA
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const defaultProps = { ...props };
  const mockQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_CREATE_IDEA];

  const utils = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaCardForm {...defaultProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const inputTextArea = () => utils.queryByLabelText('idea input');
  const boxImg = () => utils.queryByAltText('ideabox');
  const submitBtn = () => utils.queryByLabelText('submit idea');

  return { ...utils, inputTextArea, boxImg, submitBtn };
};

describe('IdeaCardForm', () => {
  afterEach(cleanup);

  it('renders IdeaCardForm', () => {
    const com = arrage();

    expect(com.baseElement).toBeInTheDocument();
  });

  it('renders InputTextArea', () => {
    const com = arrage();

    expect(com.inputTextArea()).toBeInTheDocument();
  });

  it('renders BoxImg', () => {
    const com = arrage();

    expect(com.boxImg()).toBeInTheDocument();
  });

  it('renders SubmitBtn', () => {
    const com = arrage();

    expect(com.submitBtn()).toBeInTheDocument();
  });
});
