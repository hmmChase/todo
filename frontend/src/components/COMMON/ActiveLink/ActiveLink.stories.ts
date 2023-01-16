import type { Meta, StoryObj } from '@storybook/react';

import ActiveLink from './ActiveLink';

const meta: Meta<typeof ActiveLink> = {
  title: 'COMMON/ActiveLink',

  component: ActiveLink,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ActiveLink>;

export const Default: Story = { args: {} };
