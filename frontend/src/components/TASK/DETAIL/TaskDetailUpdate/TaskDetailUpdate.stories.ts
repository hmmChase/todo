import TaskDetailUpdate from './TaskDetailUpdate';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskDetailUpdate> = {
  title: 'TASK/DETAIL/TaskDetailUpdate',

  component: TaskDetailUpdate,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TaskDetailUpdate>;

export const Default: Story = {
  args: { children: 'content', id: '1' }
};
