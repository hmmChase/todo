import CreateIdea from './CreateIdea';
import {
  cleanup,
  render,
  screen,
  userEvent,
  waitFor
} from '@/utils/test-utils';

// import { CREATE_IDEA } from '@/graphql/queries/idea';

/** test:
- renders without error
- button disabled when textarea is empty
- button enabled when textarea is not empty
*/

describe('CreateIdea', () => {
  afterEach(cleanup);

  it('renders without error', async () => {
    render(<CreateIdea />);
  });

  it('button disabled when textArea is empty', async () => {
    render(<CreateIdea />);

    const button = await screen.findByText('+');

    expect(button).toBeDisabled();
  });

  it('button enabled when textArea is not empty', async () => {
    render(<CreateIdea />);

    const textbox = await screen.findByRole('textbox');

    await waitFor(async () => await userEvent.type(textbox, 'content'));

    expect(textbox).toHaveValue('content');

    const button = await screen.findByText('+');

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
