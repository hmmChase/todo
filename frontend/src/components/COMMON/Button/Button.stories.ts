import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'COMMON/Button',

  component: Button,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { name: 'name' } };
