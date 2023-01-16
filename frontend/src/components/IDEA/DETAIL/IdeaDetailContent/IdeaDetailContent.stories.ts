import type { Meta, StoryObj } from '@storybook/react';

import IdeaDetailContent from './IdeaDetailContent';

const meta: Meta<typeof IdeaDetailContent> = {
  title: 'IDEA/DETAIL/IdeaDetailContent',

  component: IdeaDetailContent,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaDetailContent>;

export const Default: Story = {
  args: {
    currentUserOwnsIdea: false,

    onSetText: function (text: string): void {
      throw new Error('Function not implemented.');
    },

    text: 'text'
  }
};
