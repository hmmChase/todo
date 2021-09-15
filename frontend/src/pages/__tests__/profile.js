import { renderApollo, cleanup, waitForElement } from '../../test-utils';
import Profile, { CURRENT_USER } from '../profile';
import {} from '../../graphql/queries/user';

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

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders profile page', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER },
        result: { data: { me: mockMe } }
      }
    ];

    const { getByText } = renderApollo(<Profile />, { mocks });

    // if the profile renders, it will have the list of missions booked
    await waitForElement(() => getByText(/test mission/i));
  });
});
