import HeaderLoggedIn from './HeaderLoggedIn';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeaderLoggedIn> = {
  title: 'SECTIONS/HEADER/HeaderLoggedIn',

  component: HeaderLoggedIn,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HeaderLoggedIn>;

export const Default: Story = { args: {} };
