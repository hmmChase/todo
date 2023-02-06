import IdeaDetailUpdate from './IdeaDetailUpdate';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IdeaDetailUpdate> = {
  title: 'IDEA/DETAIL/IdeaDetailUpdate',

  component: IdeaDetailUpdate,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaDetailUpdate>;

export const Default: Story = {
  args: { children: 'content', id: '1' }
};
