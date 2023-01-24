import type { Meta, StoryObj } from '@storybook/react';

import Admin from './Admin';

const meta: Meta<typeof Admin> = {
  title: 'SECTIONS/Admin',

  component: Admin,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Admin>;

export const Default: Story = { args: {} };
