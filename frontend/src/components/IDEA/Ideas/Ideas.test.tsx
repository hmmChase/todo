import { cleanup, render, screen } from '@/utils/test-utils';
import { ideas } from '@/mocks/idea';
import displayMsg from '@/constants/displayMsg';
import Ideas from './Ideas';

describe('Ideas', () => {
  afterEach(cleanup);

  it('renders ideas if ideas', () => {
    render(<Ideas ideas={ideas} />);

    const idea = screen.queryAllByRole('listitem');

    expect(idea).toHaveLength(3);
  });

  it('renders message if no ideas', () => {
    render(<Ideas ideas={[]} />);

    const idea = screen.queryAllByRole('listitem');

    expect(idea).toHaveLength(0);

    const message = screen.getByText(displayMsg.idea.noIdeas);

    expect(message).toBeInTheDocument();
  });

  // it('renders loading icon on loading', async () => {
  //   render(<Ideas ideas={ideas} />, { mocks: [READ_IDEAS] });

  //   const loading = await screen.findByTestId('loading');

  //   expect(loading).toBeInTheDocument();
  // });

  // it('renders list of ideas on success', async () => {
  //   render(<Ideas ideas={ideas} />, { mocks: [READ_IDEAS] });

  //   const loading = await screen.findByTestId('loading');

  //   expect(loading).toBeInTheDocument();

  //   const ideas = await screen.findByText('idea content 1');

  //   expect(ideas).toBeInTheDocument();
  // });

  // it('renders error message on error', async () => {
  //   render(<Ideas ideas={ideas} />, { mocks: [READ_IDEAS_ERROR] });

  //   const loading = await screen.findByTestId('loading');

  //   expect(loading).toBeInTheDocument();

  //   const error = await screen.findByText('Something went wrong');

  //   expect(error).toBeInTheDocument();
  // });
});
