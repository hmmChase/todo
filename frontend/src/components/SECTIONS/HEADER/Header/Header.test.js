import { cleanup, render, screen, waitFor } from '@/utils/test-utils';
// import { mockGQLError } from '@/mocks/mockGQLErrors';
import UserProvider from '@/context/User';
import Header from './Header';
import { CURRENT_USER } from '@/mocks/user/graphql';

// jest.mock('@/context/User', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       user: {
//         loading: false,
//         // error: mockGQLError,
//         data: { user: { id: '1' } }
//       }
//     };
//   });
// });

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/route', isReady: true })
}));

describe('UserProvider', () => {
  afterEach(cleanup);

  test.skip('renders no user icon when loading', async () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    // screen.debug();

    // await waitFor(() => {
    const loader = screen.getByTestId(/loading/i);

    expect(loader).toBeInTheDocument();
    // });
  });

  test.skip('renders logged out when user not logged in', () => {
    render(<UserProvider>children</UserProvider>);

    const errorMessage = screen.getByText(/ERROR/i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('renders user icon when logged in', () => {
    render(<UserProvider>children</UserProvider>);

    const children = screen.getByText(/children/i);

    expect(children).toBeInTheDocument();
  });
});
