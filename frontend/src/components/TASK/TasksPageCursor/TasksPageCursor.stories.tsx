import TasksPageCursor from './TasksPageCursor';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TasksPageCursor> = {
  title: 'TASK/TasksPageCursor',

  component: TasksPageCursor,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TasksPageCursor>;

export const Default: Story = { args: {} };
