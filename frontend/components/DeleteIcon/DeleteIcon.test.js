import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import DeleteIcon from './DeleteIcon';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_DELETE_IDEA
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

const arrage = (newProps = {}, newQueries = []) => {
  const defaultProps = { id: '1' };
  const defaultQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_DELETE_IDEA];
  const mockQueries = newQueries.length ? newQueries : defaultQueries;
  const mockProps = { ...defaultProps, ...newProps };

  const result = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <DeleteIcon {...mockProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const deleteIcon = () => result.queryByLabelText('delete icon');

  return { ...result, deleteIcon };
};

describe('DeleteIcon', () => {
  afterEach(cleanup);

  it('renders elements', () => {
    const com = arrage();

    expect(com.deleteIcon()).toBeInTheDocument();
  });
});
