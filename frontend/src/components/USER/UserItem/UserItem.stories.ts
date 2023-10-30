import type { Meta, StoryObj } from '@storybook/react';

import UserItem from './UserItem';

const meta: Meta<typeof UserItem> = {
  title: 'USER/UserItem',

  component: UserItem,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof UserItem>;

export const Default: Story = {
  args: { email: 'email', role: 'role', userId: 'userId' }
};
