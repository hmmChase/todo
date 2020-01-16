import { prettyDOM, render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_DELETE_IDEA
} from '../__mocks__/graphql/ideas';
import theme from '../../public/styles/theme.style';

describe('DeleteIcon', () => {
  it('matches snapshot', () => {
    const mockProps = { id: '1' };
    const mockQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_DELETE_IDEA];

    const utils = render(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <DeleteIcon {...mockProps} />
        </ThemeProvider>
      </MockedProvider>
    );

    const container = utils.container.firstChild;

    expect(container).toMatchSnapshot();
  });
});
