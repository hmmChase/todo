import { render, cleanup, prettyDOM, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import DeleteIcon from './DeleteIcon';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_DELETE_IDEA
} from '../../__tests__/__mocks__/graphql/idea';
import theme from '../../public/styles/theme.style';

const arrage = (props = {}) => {
  const defaultProps = { id: '1', ...props };
  const mockQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_DELETE_IDEA];

  const utils = render(
    <MockedProvider mocks={mockQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <DeleteIcon {...defaultProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const deleteIcon = () => utils.queryByLabelText('delete icon');

  return { ...utils, deleteIcon };
};

describe('DeleteIcon', () => {
  afterEach(cleanup);

  it('renders DeleteIcon', () => {
    const com = arrage();

    expect(com.deleteIcon()).toBeInTheDocument();
  });
});
