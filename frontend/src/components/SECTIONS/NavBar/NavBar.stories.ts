import type { Meta, StoryObj } from '@storybook/react';

import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'SECTIONS/NavBar',

  component: NavBar,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = { args: {} };
