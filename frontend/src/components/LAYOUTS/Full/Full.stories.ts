import type { Meta, StoryObj } from '@storybook/react';

import Full from './Full';

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
