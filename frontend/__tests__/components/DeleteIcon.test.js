import React from 'react';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { pageSize } from '../../constants';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { MOCK_CURRENT_USER_PAGINATED_IDEAS } from '../__mocks__/graphql/ideas';
import theme from '../../public/styles/theme.style';

// import { DeleteIcon } from '../../components/DeleteIcon/DeleteIcon.style';

describe('DeleteIcon', () => {
  afterEach(() => {
    cleanup;
  });

  it('matches snapshot', () => {
    const mockProps = { id: '1' };
    const mockQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS];

    const result = render(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <DeleteIcon {...mockProps} />
        </ThemeProvider>
      </MockedProvider>
    );

    // console.log('TCL: result', result.debug());

    expect(result.asFragment()).toMatchSnapshot();
  });

  it('has correct content', () => {
    const mockProps = { id: '1' };
    const mockQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS];

    const { getByTestId } = render(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <DeleteIcon {...mockProps} />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(getByTestId('deleteIcon')).toHaveTextContent('');
  });

  it('calls mutation on click', () => {
    const mockProps = { id: '1' };
    const mockQueries = [MOCK_CURRENT_USER_PAGINATED_IDEAS];

    const result = render(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <DeleteIcon {...mockProps} />
        </ThemeProvider>
      </MockedProvider>
    );

    result.fireEvent.click(getByTestId('deleteIcon'));

    expect(getByTestId('deleteIcon')).toHaveBeenCalledTimes(1);
  });
});
