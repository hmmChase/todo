import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import BackBtn from './BackBtn';
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
        { node: { id: '5', content: 'e', author: { id: '5' } } }
      ],
      pageInfo: { endCursor: '87cvybx', hasNextPage: true }
    }
  };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <BackBtn {...mockProps} />
    </ThemeProvider>
  );

  const BackBtn = () => result.queryByLabelText('load more button');
  const loadingIcon = () => result.queryByLabelText('icon: loading');
  const clickBackBtn = () => fireEvent.click(BackBtn());

  return { ...result, mockProps, BackBtn, loadingIcon, clickBackBtn };
};

describe('BackBtn', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.BackBtn()).toBeInTheDocument();
  });

  it('renders loading icon if loading', () => {
    const com = arrage({ loading: true });

    expect(com.loadingIcon()).toBeInTheDocument();
  });

  it('calls fetchMore on click', () => {
    const com = arrage();

    com.clickBackBtn();

    expect(com.mockProps.fetchMore).toHaveBeenCalledTimes(1);
  });
});
