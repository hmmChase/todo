import ActiveLink from './ActiveLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ActiveLink> = {
  title: 'COMMON/ActiveLink',

  component: ActiveLink,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ActiveLink>;

export const Default: Story = {
  args: {
    activeClassName: 'active',
    children: 'ActiveLink',
    className: 'class',
    href: '/'
  }
};
