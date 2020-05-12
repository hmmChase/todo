import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import IdeaCardForm from './IdeaCardForm';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_CREATE_IDEA,
} from '../../../__tests__/__mocks__/graphql/idea';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = {};
  const defaultQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_CREATE_IDEA];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaCardForm {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const inputTextArea = () => result.queryByLabelText('idea input');
  const boxImg = () => result.queryByAltText('ideabox');
  const submitBtn = () => result.queryByLabelText('submit idea');

  return { ...result, inputTextArea, boxImg, submitBtn };
};

describe('IdeaCardForm', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.inputTextArea()).toBeInTheDocument();
    expect(com.boxImg()).toBeInTheDocument();
    expect(com.submitBtn()).toBeInTheDocument();
  });
});
