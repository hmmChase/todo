import type { Meta, StoryObj } from '@storybook/react';

import IdeaItem from './IdeaItem';

const meta: Meta<typeof IdeaItem> = {
  title: 'IDEA/IdeaItem',

  component: IdeaItem,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaItem>;

export const Default: Story = {
  args: { authorId: 'authorId', content: 'content', ideaId: 'ideaId' }
};
