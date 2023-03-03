import IdeaDetail from './IdeaDetail';
import type { Meta, StoryObj } from '@storybook/react';
import UserProvider from '@/context/User';

const meta: Meta<typeof IdeaDetail> = {
  title: 'IDEA/DETAIL/IdeaDetail',

  component: IdeaDetail,

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

type Story = StoryObj<typeof IdeaDetail>;

export const Default: Story = {
  args: { authorId: '1', content: 'content', ideaId: '1' }
};

export const AsAuthor: Story = {
  args: { authorId: '2', content: 'content', ideaId: '1' }
};
