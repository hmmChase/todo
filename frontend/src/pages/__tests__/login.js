import {
  renderApollo,
  cleanup,
  fireEvent,
  waitForElement
} from '../../test-utils';
import LogInPage from './login';
import { LOG_IN } from '../../graphql/queries/user';
import { cache, isLoggedInVar } from '../../graphql/cache';

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    renderApollo(<LogInPage />);
  });

  it('fires login mutation and updates cache after done', async () => {
    expect(isLoggedInVar()).toBeFalsy();

    const mocks = [
      {
        request: {
          query: LOG_IN,
          variables: { email: 'a@a.a', password: 'a' }
        },

        result: { data: { login: { id: '1' } } }
      }
    ];

    const { getByText, getByTestId } = await renderApollo(<LogInPage />, {
      mocks,
      cache
    });

    fireEvent.change(getByTestId('login-input'), {
      target: { value: 'a@a.a' }
    });

    fireEvent.click(getByText(/log in/i));

    // login is done if loader is gone
    await waitForElement(() => getByText(/log in/i));

    expect(isLoggedInVar()).toBeTruthy();
  });
});
