import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import IdeaInput from './IdeaInput';
import {
  MOCK_UPDATE_IDEA,
  MOCK_ERROR_UPDATE_IDEA
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}, error = false) => {
  const defaultProps = { id: '1', content: 'mock content', ...props };
  const defaultQueries = error ? [MOCK_ERROR_UPDATE_IDEA] : [MOCK_UPDATE_IDEA];

  const utils = render(
    <MockedProvider mocks={defaultQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaInput {...defaultProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const ideaInput = () => utils.queryByLabelText('idea input');

  const changeIdeaInput = () =>
    fireEvent.change(ideaInput(), {
      target: { value: 'updated mock content' }
    });

  return { ...utils, ideaInput, changeIdeaInput };
};

describe('IdeaInput', () => {
  afterEach(cleanup);

  it('renders IdeaInput with passed-in content', () => {
    const com = arrage();

    expect(com.ideaInput()).toBeInTheDocument();
  });

  it('renders IdeaInput with updated content on change', async () => {
    const com = arrage();

    expect(com.ideaInput()).toHaveTextContent('mock content');

    com.changeIdeaInput();

    expect(com.ideaInput()).toHaveTextContent('updated mock content');
  });
});
