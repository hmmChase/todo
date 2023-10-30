import type { Meta, StoryObj } from '@storybook/react';

import Expand from './Expand';

const meta: Meta<typeof Expand> = {
  title: 'ICONS/Expand',

  component: Expand,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Expand>;

export const Default: Story = { args: {} };
