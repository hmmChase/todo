import type { Meta, StoryObj } from '@storybook/react';

import IdeasPageOffset from './IdeasPageOffset';

const meta: Meta<typeof IdeasPageOffset> = {
  title: 'IDEA/IdeasPageOffset',

  component: IdeasPageOffset,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeasPageOffset>;

export const Default: Story = { args: {} };
