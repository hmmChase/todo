import type { Meta, StoryObj } from '@storybook/react';

import CreateIdea from './CreateIdea';

const meta: Meta<typeof CreateIdea> = {
  title: 'IDEA/CreateIdea',

  component: CreateIdea,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof CreateIdea>;

export const Default: Story = { args: {} };
