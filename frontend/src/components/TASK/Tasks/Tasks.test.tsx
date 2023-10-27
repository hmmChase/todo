import { cleanup, render, screen } from '@/utils/test-utils';
import { tasks } from '@/mocks/task';
import displayMsg from '@/constants/displayMsg';
import Tasks from './Tasks';

describe('Tasks', () => {
  afterEach(cleanup);

  it('renders tasks if tasks', () => {
    render(<Tasks tasks={tasks} />);

    const task = screen.queryAllByRole('listitem');

    expect(task).toHaveLength(3);
  });

  it('renders message if no tasks', () => {
    render(<Tasks tasks={[]} />);

    const task = screen.queryAllByRole('listitem');

    expect(task).toHaveLength(0);

    const message = screen.getByText(displayMsg.task.noTasks);

    expect(message).toBeInTheDocument();
  });
});
