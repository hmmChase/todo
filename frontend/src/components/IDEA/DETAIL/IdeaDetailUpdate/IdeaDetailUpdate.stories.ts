import type { Meta, StoryObj } from '@storybook/react';

import IdeaDetailUpdate from './IdeaDetailUpdate';

const meta: Meta<typeof IdeaDetailUpdate> = {
  title: 'IDEA/DETAIL/IdeaDetailUpdate',

  component: IdeaDetailUpdate,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaDetailUpdate>;

export const Default: Story = {
  args: { content: 'content', currentUserOwnsIdea: false, id: 'id' }
};
