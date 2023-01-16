import type { Meta, StoryObj } from '@storybook/react';

import IdeasPageCursor from './IdeasPageCursor';

const meta: Meta<typeof IdeasPageCursor> = {
  title: 'IDEA/IdeasPageCursor',

  component: IdeasPageCursor,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeasPageCursor>;

export const Default: Story = { args: {} };
