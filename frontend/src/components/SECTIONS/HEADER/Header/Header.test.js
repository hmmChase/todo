import { cleanup, render, screen, waitFor } from '@/utils/test-utils';
import { CURRENT_USER, NO_CURRENT_USER } from '@/mocks/user/graphql';
import Header from './Header';
import UserProvider from '@/context/User';

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/route', isReady: true })
}));

describe('UserProvider', () => {
  afterEach(cleanup);

  test('renders no user icon when loading', () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    const userIcon = screen.queryByTestId('user-icon');

    expect(userIcon).not.toBeInTheDocument();
  });

  test('renders logged out when user not logged in', async () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>,

      { mocks: [NO_CURRENT_USER] }
    );

    await waitFor(() => {
      const headerLoggedOut = screen.getByTestId('header-logged-out');

      expect(headerLoggedOut).toBeInTheDocument();
    });
  });

  test('renders user icon when logged in', async () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    await waitFor(() => {
      const userIcon = screen.getByTestId('user-icon');

      expect(userIcon).toBeInTheDocument();
    });
  });
});
