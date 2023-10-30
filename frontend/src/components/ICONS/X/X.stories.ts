import type { Meta, StoryObj } from '@storybook/react';

import X from './X';

const meta: Meta<typeof X> = {
  title: 'ICONS/X',

  component: X,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof X>;

export const Default: Story = { args: {} };
