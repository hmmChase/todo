import TaskDetailIcon from './TaskDetailIcon';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskDetailIcon> = {
  title: 'TASK/DETAIL/TaskDetailIcon',

  component: TaskDetailIcon,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TaskDetailIcon>;

export const Default: Story = { args: { taskId: '1' } };
