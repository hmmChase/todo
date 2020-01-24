import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import IdeaCardList from './IdeaCardList';
import theme from '../../public/styles/theme.style';

jest.mock('../IdeaCard/IdeaCard', () => () => <div>IdeaCard</div>);

const arrage = (props = {}) => {
  const ideas = [
    { node: { id: '1', content: 'a', author: { id: '1' } } },
    { node: { id: '2', content: 'b', author: { id: '2' } } }
  ];

  const defaultProps = { loading: false, ideas, ...props };

  const utils = render(
    <ThemeProvider theme={theme}>
      <IdeaCardList {...defaultProps} />
    </ThemeProvider>
  );

  const ideaCards = () => utils.queryAllByText('IdeaCard');

  return { ...utils, ideaCards };
};

describe('IdeaCardList', () => {
  afterEach(cleanup);

  it('renders IdeaCardList', () => {
    const com = arrage();

    expect(com.baseElement).toBeInTheDocument();
  });

  it('renders IdeaCard for each idea', () => {
    const com = arrage();

    expect(com.ideaCards()).toHaveLength(2);
  });

  xit('renders loading element when loading', () => {
    const com = arrage({ loading: true });

    console.log('TCL: com', prettyDOM(com.baseElement));

    expect(com.ideaCards()).toHaveLength(2);
  });
});
