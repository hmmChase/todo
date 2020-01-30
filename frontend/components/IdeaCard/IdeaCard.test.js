import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import IdeaCard from './IdeaCard';
import theme from '../../public/styles/theme.style';

jest.mock('../DetailIcon/DetailIcon', () => () => <div>DetailIcon</div>);
jest.mock('../DeleteIcon/DeleteIcon', () => () => <div>DeleteIcon</div>);
jest.mock('../IdeaInput/IdeaInput', () => () => <div>IdeaInput</div>);

const arrage = (newProps = {}) => {
  const defaultProps = { id: '1', content: 'mock content' };
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <ThemeProvider theme={theme}>
      <IdeaCard {...mockProps} />
    </ThemeProvider>
  );

  const ideaCard = () => result.queryByTestId('IdeaCard');
  const detailIcon = () => result.queryByText('DetailIcon');
  const deleteIcon = () => result.queryByText('DeleteIcon');
  const ideaInput = () => result.queryByText('IdeaInput');

  return { ...result, ideaCard, detailIcon, deleteIcon, ideaInput };
};

describe('IdeaCard', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.ideaCard()).toBeInTheDocument();
    expect(com.detailIcon()).toBeInTheDocument();
    expect(com.deleteIcon()).toBeInTheDocument();
    expect(com.ideaInput()).toBeInTheDocument();
  });
});
