import { admin } from '@/mocks/user';
import { cleanup, render, screen, waitFor } from '@/utils/test-utils';
import { CURRENT_USER } from '@/mocks/user/graphql';
import IdeaItem from './IdeaItem';
import UserProvider from '@/context/User';

describe('IdeaItem', () => {
  afterEach(cleanup);

  const props = { authorId: '2', content: 'idea', ideaId: '1' };

  it('renders idea', () => {
    render(<IdeaItem {...props} />);

    const content = screen.getByText(props.content);

    expect(content).toBeInTheDocument();
  });

  it('renders RemoveIdea when user is author', async () => {
    render(
      <UserProvider>
        <IdeaItem {...props} />
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
        <IdeaItem {...props} />
      </UserProvider>,

      { mocks: [{ ...CURRENT_USER, result: { data: { currentUser: admin } } }] }
    );

    const removeIdea = await screen.findByRole('button', {
      name: 'removeIdea'
    });

    expect(removeIdea).toBeInTheDocument();
  });

  it('doesnt render RemoveIdea when user is not author or admin', async () => {
    render(
      <UserProvider>
        <IdeaItem {...props} authorId='3' />
      </UserProvider>,

      { mocks: [CURRENT_USER] }
    );

    await waitFor(() => {
      const removeIdea = screen.queryByRole('button', { name: 'removeIdea' });

      expect(removeIdea).not.toBeInTheDocument();
    });
  });
});