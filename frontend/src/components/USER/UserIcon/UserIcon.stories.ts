import type { Meta, StoryObj } from '@storybook/react';
import UserIcon from './UserIcon';

const meta: Meta<typeof UserIcon> = {
  title: 'USER/UserIcon',

  component: UserIcon,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof UserIcon>;

export const Default: Story = { args: {} };
