import IdeaItem from './IdeaItem';
import type { Meta, StoryObj } from '@storybook/react';
import UserProvider from '@/context/User';

const meta: Meta<typeof IdeaItem> = {
  title: 'IDEA/IdeaItem',

  component: IdeaItem,

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

type Story = StoryObj<typeof IdeaItem>;

export const Default: Story = {
  args: { authorId: '3', content: 'content', ideaId: '1' }
};

export const AsAuthor: Story = {
  args: { authorId: '2', content: 'content', ideaId: '1' }
};
