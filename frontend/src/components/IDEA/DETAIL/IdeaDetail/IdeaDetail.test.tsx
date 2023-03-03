import { admin } from '@/mocks/user';
import { cleanup, render, screen, waitFor } from '@/utils/test-utils';
import { CURRENT_USER } from '@/mocks/user/graphql';
import IdeaDetail from './IdeaDetail';
import UserProvider from '@/context/User';

describe('IdeaDetail', () => {
  afterEach(cleanup);

  const props = { authorId: '2', content: 'idea', ideaId: '1' };

  it('renders idea', () => {
    render(<IdeaDetail {...props} />);

    const content = screen.getByText(props.content);

    expect(content).toBeInTheDocument();
  });

  it('renders RemoveIdea when user is author/admin', async () => {
    render(
      <UserProvider>
        <IdeaDetail {...props} />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    const removeIdea = await screen.findByRole('button', {
      name: 'removeIdea'
    });

    expect(removeIdea).toBeInTheDocument();
  });

  it('renders RemoveIdea when user is admin and authorId doesnt match', async () => {
    render(
      <UserProvider>
        <IdeaDetail {...props} />
      </UserProvider>,

      { mocks: [{ ...CURRENT_USER, result: { data: { currentUser: admin } } }] }
    );

    const removeIdea = await screen.findByRole('button', {
      name: 'removeIdea'
    });

    expect(removeIdea).toBeInTheDocument();
  });

  it('doesnt render RemoveIdea when user is not author/admin', async () => {
    render(
      <UserProvider>
        <IdeaDetail {...props} authorId='3' />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    await waitFor(() => {
      const removeIdea = screen.queryByRole('button', { name: 'removeIdea' });

      expect(removeIdea).not.toBeInTheDocument();
    });
  });
});
