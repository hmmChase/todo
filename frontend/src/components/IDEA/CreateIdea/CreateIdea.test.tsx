import {
  cleanup,
  render,
  screen,
  userEvent,
  waitFor
} from '@/utils/test-utils';
import CreateIdea from './CreateIdea';

// import { CREATE_IDEA } from '@/graphql/queries/idea';

describe('CreateIdea', () => {
  afterEach(cleanup);

  it('disables button when textArea is empty', () => {
    render(<CreateIdea />);

    const button = screen.getByRole('button', { name: 'submitIdea' });

    expect(button).toBeDisabled();
  });

  it('enables button when textArea is filled', async () => {
    render(<CreateIdea />);

    const textbox = screen.getByRole('textbox');

    await waitFor(async () => await userEvent.type(textbox, 'content'));

    expect(textbox).toHaveValue('content');

    const button = screen.getByRole('button', { name: 'submitIdea' });

    expect(button).toBeEnabled();
  });

  // it('should render loading and success states on create', async () => {

  //   const createIdea = {
  //     __typename: 'Idea',
  //     id: '1',
  //     createdAt: '32452424',
  //     content: 'idea content 1',
  //     author: { id: '1' }
  //   };

  //   const mocks = [
  //     {
  //       request: {
  //         query: CREATE_IDEA,
  //         variables: { content: 'idea content 1' }
  //       },

  //       result: { data: { idea: createIdea } }
  //     }
  //   ];

  //   const view = render(
  //     <ThemeProvider theme={theme}>
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <CreateIdea />
  //       </MockedProvider>
  //     </ThemeProvider>
  //   );

  //   const textArea = await screen.findByTestId('textArea');

  //   textArea.focus();

  //   userEvent.type(textArea, 'idea content 1');

  //   const button = await screen.findByText('+');

  //   userEvent.click(button);

  //   const idea = await screen.findByText('idea content 1');

  //   expect(idea).toBeInTheDocument();
  // });
});
