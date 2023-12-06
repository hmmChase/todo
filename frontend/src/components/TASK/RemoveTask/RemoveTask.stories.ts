import type { Meta, StoryObj } from '@storybook/react';

import RemoveTask from './RemoveTask';

const meta: Meta<typeof RemoveTask> = {
  title: 'TASK/RemoveTask',

  component: RemoveTask,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof RemoveTask>;

export const Default: Story = { args: { taskId: '1' } };
