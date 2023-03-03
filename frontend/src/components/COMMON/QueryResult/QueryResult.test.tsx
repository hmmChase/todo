import { cleanup, render, screen } from '@/utils/test-utils';
import { mockGQLError } from '@/mocks/mockGQLErrors';
import QueryResult from './QueryResult';

describe('QueryResult', () => {
  afterEach(cleanup);

  test('renders loading icon if loading and showLoading are true', () => {
    render(
      <QueryResult loading={true} error={undefined} showLoading={true}>
        children
      </QueryResult>
    );

    const loader = screen.getByTestId(/loading/i);

    expect(loader).toBeInTheDocument();
  });

  test('renders error message if error and showError are true', () => {
    render(
      <QueryResult loading={false} error={mockGQLError} showError={true}>
        children
      </QueryResult>
    );

    const errorMessage = screen.getByText(/Something went wrong/i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('renders children when not loading and no error', () => {
    render(
      <QueryResult loading={false} error={undefined}>
        children
      </QueryResult>
    );

    const children = screen.getByText(/children/i);

    expect(children).toBeInTheDocument();
  });
});
