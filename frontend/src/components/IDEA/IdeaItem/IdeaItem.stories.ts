import IdeaItem from './IdeaItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IdeaItem> = {
  title: 'IDEA/IdeaItem',

  component: IdeaItem,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaItem>;

export const Default: Story = {
  args: { authorId: '1', content: 'content', ideaId: '1' }
};
