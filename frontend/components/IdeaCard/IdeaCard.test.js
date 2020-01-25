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

  const utils = render(
    <ThemeProvider theme={theme}>
      <IdeaCard {...mockProps} />
    </ThemeProvider>
  );

  const ideaCard = () => utils.queryByTestId('IdeaCard');
  const detailIcon = () => utils.queryByText('DetailIcon');
  const deleteIcon = () => utils.queryByText('DeleteIcon');
  const ideaInput = () => utils.queryByText('IdeaInput');

  return { ...utils, ideaCard, detailIcon, deleteIcon, ideaInput };
};

describe('IdeaCard', () => {
  afterEach(cleanup);

  it('renders IdeaCard', () => {
    const com = arrage();

    expect(com.ideaCard()).toBeInTheDocument();
  });

  it('renders DetailIcon', () => {
    const com = arrage();

    expect(com.detailIcon()).toBeInTheDocument();
  });

  it('renders DeleteIcon', () => {
    const com = arrage();

    expect(com.deleteIcon()).toBeInTheDocument();
  });

  it('renders IdeaInput', () => {
    const com = arrage();

    expect(com.ideaInput()).toBeInTheDocument();
  });
});
