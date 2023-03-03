import Full from './Full';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Full> = {
  title: 'LAYOUTS/Full',

  component: Full,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Full>;

export const Default: Story = {
  args: { description: 'description', title: 'title' }
};
