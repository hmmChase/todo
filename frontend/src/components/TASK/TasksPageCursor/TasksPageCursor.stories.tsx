import type { Meta, StoryObj } from '@storybook/react';

import TasksPageCursor from './TasksPageCursor';

const meta: Meta<typeof TasksPageCursor> = {
  title: 'TASK/TasksPageCursor',

  component: TasksPageCursor,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TasksPageCursor>;

export const Default: Story = { args: {} };
