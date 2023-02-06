import IdeasPageOffset from './IdeasPageOffset';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IdeasPageOffset> = {
  title: 'IDEA/IdeasPageOffset',

  component: IdeasPageOffset,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeasPageOffset>;

export const Default: Story = { args: {} };
