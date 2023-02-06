import { cleanup, render, screen } from '@/utils/test-utils';
import { READ_IDEAS, READ_IDEAS_ERROR } from '@/mocks/idea/graphql';
import Ideas from './Ideas';

describe('Ideas', () => {
  afterEach(cleanup);

  it('renders loading icon on loading', async () => {
    render(<Ideas />, { mocks: [READ_IDEAS] });

    const loading = await screen.findByTestId('loading');

    expect(loading).toBeInTheDocument();
  });

  it('renders list of ideas on success', async () => {
    render(<Ideas />, { mocks: [READ_IDEAS] });

    const loading = await screen.findByTestId('loading');

    expect(loading).toBeInTheDocument();

    const ideas = await screen.findByText('idea content 1');

    expect(ideas).toBeInTheDocument();
  });

  it('renders error message on error', async () => {
    render(<Ideas />, { mocks: [READ_IDEAS_ERROR] });

    const loading = await screen.findByTestId('loading');

    expect(loading).toBeInTheDocument();

    const error = await screen.findByText('Something went wrong');

    expect(error).toBeInTheDocument();
  });
});
