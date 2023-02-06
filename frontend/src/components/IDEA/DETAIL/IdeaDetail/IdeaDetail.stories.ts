import type { Meta, StoryObj } from '@storybook/react';

import IdeaDetail from './IdeaDetail';

const meta: Meta<typeof IdeaDetail> = {
  title: 'IDEA/DETAIL/IdeaDetail',

  component: IdeaDetail,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaDetail>;

export const Default: Story = {
  args: { authorId: '1', content: 'content', ideaId: '1' }
};
