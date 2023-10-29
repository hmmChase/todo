import TasksPageOffset from './TasksPageOffset';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TasksPageOffset> = {
  title: 'TASK/TasksPageOffset',

  component: TasksPageOffset,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TasksPageOffset>;

export const Default: Story = { args: {} };
