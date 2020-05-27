import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ShowMoreBtn from './ShowMoreBtn';
import theme from '../../../public/styles/theme.style';

const arrage = (newProps = {}) => {
  const defaultProps = {
    loading: false,
    fetchMore: jest.fn(),
    ideas: {
      edges: [
        { node: { id: '1', content: 'a', author: { id: '1' } } },
        { node: { id: '2', content: 'b', author: { id: '2' } } },
        { node: { id: '3', content: 'c', author: { id: '3' } } },
        { node: { id: '4', content: 'd', author: { id: '4' } } },
        { node: { id: '5', content: 'e', author: { id: '5' } } },
      ],
      pageInfo: { endCursor: '87cvybx', hasNextPage: true },
    },
  };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <ShowMoreBtn {...mockProps} />
    </ThemeProvider>
  );

  const ShowMoreBtn = () => result.queryByLabelText('load more button');
  const loadingIcon = () => result.queryByLabelText('icon: loading');
  const clickShowMoreBtn = () => fireEvent.click(ShowMoreBtn());

  return { ...result, mockProps, ShowMoreBtn, loadingIcon, clickShowMoreBtn };
};

describe('ShowMoreBtn', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.ShowMoreBtn()).toBeInTheDocument();
  });

  it('renders loading icon if loading', () => {
    const com = arrage({ loading: true });

    expect(com.loadingIcon()).toBeInTheDocument();
  });

  it('calls fetchMore on click', () => {
    const com = arrage();

    com.clickShowMoreBtn();

    expect(com.mockProps.fetchMore).toHaveBeenCalledTimes(1);
  });
});
