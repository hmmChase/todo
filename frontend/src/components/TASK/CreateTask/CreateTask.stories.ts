import type { Meta, StoryObj } from '@storybook/react';

import CreateTask from './CreateTask';

const meta: Meta<typeof CreateTask> = {
  title: 'TASK/CreateTask',

  component: CreateTask,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof CreateTask>;

export const Default: Story = { args: {} };
