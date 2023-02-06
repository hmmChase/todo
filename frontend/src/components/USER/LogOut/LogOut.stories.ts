import LogOut from './LogOut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LogOut> = {
  title: 'USER/LogOut',

  component: LogOut,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof LogOut>;

export const Default: Story = { args: {} };
