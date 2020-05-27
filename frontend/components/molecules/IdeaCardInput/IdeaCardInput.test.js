import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  act,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import IdeaCardInput from './IdeaCardInput';
import { MOCK_UPDATE_IDEA } from '../../../__tests__/__mocks__/graphql/idea';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = { id: '1', content: 'mock content' };
  const defaultQueries = [MOCK_UPDATE_IDEA];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <IdeaCardInput {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const IdeaCardInput = () => result.queryByLabelText('idea input');

  const changeIdeaCardInput = (value) =>
    fireEvent.change(IdeaCardInput(), { target: { value } });

  return { ...result, IdeaCardInput, changeIdeaCardInput };
};

describe('IdeaCardInput', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.IdeaCardInput()).toBeInTheDocument();
  });

  it('renders IdeaCardInput with updated content on change', async () => {
    const com = arrage();

    expect(com.IdeaCardInput()).toHaveTextContent('mock content');

    com.changeIdeaCardInput('updated mock content');

    expect(com.IdeaCardInput()).toHaveTextContent('updated mock content');
  });
});
