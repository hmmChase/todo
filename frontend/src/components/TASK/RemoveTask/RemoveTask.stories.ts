import RemoveTask from './RemoveTask';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RemoveTask> = {
  title: 'TASK/RemoveTask',

  component: RemoveTask,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof RemoveTask>;

export const Default: Story = { args: { taskId: '1' } };
