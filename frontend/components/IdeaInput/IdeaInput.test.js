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
import { MOCK_UPDATE_IDEA } from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = { id: '1', content: 'mock content' };
  const defaultQueries = [MOCK_UPDATE_IDEA];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaInput {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const ideaInput = () => result.queryByLabelText('idea input');

  const changeIdeaInput = value =>
    fireEvent.change(ideaInput(), { target: { value } });

  return { ...result, ideaInput, changeIdeaInput };
};

describe('IdeaInput', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.ideaInput()).toBeInTheDocument();
  });

  it('renders IdeaInput with updated content on change', async () => {
    const com = arrage();

    expect(com.ideaInput()).toHaveTextContent('mock content');

    com.changeIdeaInput('updated mock content');

    expect(com.ideaInput()).toHaveTextContent('updated mock content');
  });
});
