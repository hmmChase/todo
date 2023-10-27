import TaskItem from './TaskItem';
import type { Meta, StoryObj } from '@storybook/react';
import UserProvider from '@/context/User';

const meta: Meta<typeof TaskItem> = {
  title: 'TASK/TaskItem',

  component: TaskItem,

  tags: ['autodocs'],

  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TaskItem>;

export const Default: Story = {
  args: { authorId: '3', content: 'content', taskId: '1' }
};

export const AsAuthor: Story = {
  args: { authorId: '2', content: 'content', taskId: '1' }
};
