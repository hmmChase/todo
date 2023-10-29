import { admin } from '@/mocks/user';
import { cleanup, render, screen, waitFor } from '@/utils/test-utils';
import { CURRENT_USER } from '@/mocks/user/graphql';
import TaskDetail from './TaskDetail';
import UserProvider from '@/context/User';

describe('TaskDetail', () => {
  afterEach(cleanup);

  const props = { authorId: '2', content: 'task', taskId: '1' };

  it('renders task', () => {
    render(<TaskDetail {...props} />);

    const content = screen.getByText(props.content);

    expect(content).toBeInTheDocument();
  });

  it('renders RemoveTask when user is author/admin', async () => {
    render(
      <UserProvider>
        <TaskDetail {...props} />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    const removeTask = await screen.findByRole('button', {
      name: 'removeTask'
    });

    expect(removeTask).toBeInTheDocument();
  });

  it('renders RemoveTask when user is admin and authorId doesnt match', async () => {
    render(
      <UserProvider>
        <TaskDetail {...props} />
      </UserProvider>,

      { mocks: [{ ...CURRENT_USER, result: { data: { currentUser: admin } } }] }
    );

    const removeTask = await screen.findByRole('button', {
      name: 'removeTask'
    });

    expect(removeTask).toBeInTheDocument();
  });

  it('doesnt render RemoveTask when user is not author/admin', async () => {
    render(
      <UserProvider>
        <TaskDetail {...props} authorId='3' />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    await waitFor(() => {
      const removeTask = screen.queryByRole('button', { name: 'removeTask' });

      expect(removeTask).not.toBeInTheDocument();
    });
  });
});
