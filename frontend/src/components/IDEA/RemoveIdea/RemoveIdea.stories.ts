import RemoveIdea from './RemoveIdea';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RemoveIdea> = {
  title: 'IDEA/RemoveIdea',

  component: RemoveIdea,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof RemoveIdea>;

export const Default: Story = { args: { ideaId: '1' } };
