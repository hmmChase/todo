import TaskDetailContent from './TaskDetailContent';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskDetailContent> = {
  title: 'TASK/DETAIL/TaskDetailContent',

  component: TaskDetailContent,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TaskDetailContent>;

export const Default: Story = {
  args: {
    children: 'text',

    onSetText: function (text: string): void {
      throw new Error('Function not implemented.');
    }
  }
};
