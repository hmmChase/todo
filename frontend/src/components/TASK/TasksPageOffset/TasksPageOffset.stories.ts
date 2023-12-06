import type { Meta, StoryObj } from '@storybook/react';

import TasksPageOffset from './TasksPageOffset';

const meta: Meta<typeof TasksPageOffset> = {
  title: 'TASK/TasksPageOffset',

  component: TasksPageOffset,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TasksPageOffset>;

export const Default: Story = { args: {} };
