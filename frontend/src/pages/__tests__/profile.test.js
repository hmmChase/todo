import { renderApollo, cleanup, waitFor } from '../../utils/test-utils';
import AccountPage from '../account';
import { CURRENT_USER } from '../../graphql/queries/user';

const mockIdea = {
  __typename: 'Idea',
  id: 1,
  content: 'aslkdfjlkasdjflksdjafl'
};

const mockMe = {
  __typename: 'User',
  id: 1,
  email: 'a@a.a',
  ideas: [mockIdea]
};

describe('Account Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders account page', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER },
        result: { data: { me: mockMe } }
      }
    ];

    const { getByText } = renderApollo(<AccountPage />, { mocks });

    // if the account renders, it will have the list of missions booked
    await waitFor(() => getByText(/test mission/i));
  });
});
