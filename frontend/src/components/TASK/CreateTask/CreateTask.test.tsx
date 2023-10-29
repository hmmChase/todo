import {
  cleanup,
  render,
  screen,
  userEvent,
  waitFor
} from '@/utils/test-utils';
import CreateTask from './CreateTask';
import { CREATE_TASK } from '@/mocks/task/graphql';

describe('CreateTask', () => {
  afterEach(cleanup);

  it('disables button when textArea is empty', () => {
    render(<CreateTask />);

    const button = screen.getByRole('button', { name: 'submitTask' });

    expect(button).toBeDisabled();
  });

  it('enables button when textArea is filled', async () => {
    render(<CreateTask />);

    const textbox = screen.getByRole('textbox');

    await waitFor(async () => await userEvent.type(textbox, 'content'));

    expect(textbox).toHaveValue('content');

    const button = screen.getByRole('button', { name: 'submitTask' });

    expect(button).toBeEnabled();
  });

  it('disables submit button on complete', async () => {
    render(<CreateTask />, { mocks: [CREATE_TASK] });

    const textbox = screen.getByRole('textbox');

    expect(textbox).toHaveValue('');

    const button = screen.getByRole('button', { name: 'submitTask' });

    expect(button).not.toBeEnabled();

    await waitFor(async () => await userEvent.type(textbox, 'task 1'));

    expect(textbox).toHaveValue('task 1');

    await waitFor(async () => await userEvent.click(button));

    expect(textbox).toHaveValue('');

    expect(button).not.toBeEnabled();
  });

  // it('should render loading and success states on create', async () => {

  //   const createTask = {
  //     __typename: 'Task',
  //     id: '1',
  //     createdAt: '32452424',
  //     content: 'task content 1',
  //     author: { id: '1' }
  //   };

  //   const mocks = [
  //     {
  //       request: {
  //         query: CREATE_TASK,
  //         variables: { content: 'task content 1' }
  //       },

  //       result: { data: { task: createTask } }
  //     }
  //   ];

  //   const view = render(
  //     <ThemeProvider theme={theme}>
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <CreateTask />
  //       </MockedProvider>
  //     </ThemeProvider>
  //   );

  //   const textArea = await screen.findByTestId('textArea');

  //   textArea.focus();

  //   userEvent.type(textArea, 'task content 1');

  //   const button = await screen.findByText('+');

  //   userEvent.click(button);

  //   const task = await screen.findByText('task content 1');

  //   expect(task).toBeInTheDocument();
  // });
});
