import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import DeleteIcon from './DeleteIcon';
import {
  MOCK_CURRENT_USER_PAGINATED_IDEAS,
  MOCK_DELETE_IDEA,
} from '../../../__tests__/__mocks__/graphql/idea';
import theme from '../../../public/styles/theme.style';

const setup = (updatedProps = {}, updatedQueries = []) => {
  const initialProps = { id: '1' };
  const initialQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS, MOCK_DELETE_IDEA];
  const mergedQueries = updatedQueries ? updatedQueries : initialQueries;
  const mergedProps = { ...initialProps, ...updatedProps };

  const result = render(
    <MockedProvider mocks={mergedQueries} addTypename={false}>
      <ThemeProvider theme={theme}>
        <DeleteIcon {...mergedProps} />
      </ThemeProvider>
    </MockedProvider>
  );

  const deleteIcon = () => result.queryByLabelText('delete idea');

  return { ...result, mergedProps, deleteIcon };
};

describe('DeleteIcon', () => {
  afterEach(cleanup);

  it('matches snapshot', () => {
    const utils = setup();

    expect(utils.baseElement).toMatchSnapshot();
  });

  it('renders elements', () => {
    const utils = setup();

    expect(utils.deleteIcon()).toBeInTheDocument();
  });
});
