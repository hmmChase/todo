import type { Meta, StoryObj } from '@storybook/react';

import TaskDetail from './TaskDetail';
import UserProvider from '@/context/User';

const meta: Meta<typeof TaskDetail> = {
  title: 'TASK/DETAIL/TaskDetail',

  component: TaskDetail,

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

type Story = StoryObj<typeof TaskDetail>;

export const Default: Story = {
  args: { authorId: '1', content: 'content', taskId: '1' }
};

export const AsAuthor: Story = {
  args: { authorId: '2', content: 'content', taskId: '1' }
};
