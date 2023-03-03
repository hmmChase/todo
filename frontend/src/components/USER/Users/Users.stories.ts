import type { Meta, StoryObj } from '@storybook/react';
import Users from './Users';

const meta: Meta<typeof Users> = {
  title: 'USER/Users',

  component: Users,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Users>;

export const Default: Story = { args: {} };
