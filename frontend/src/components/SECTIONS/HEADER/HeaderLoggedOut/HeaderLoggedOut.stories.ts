import HeaderLoggedOut from './HeaderLoggedOut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeaderLoggedOut> = {
  title: 'SECTIONS/HEADER/HeaderLoggedOut',

  component: HeaderLoggedOut,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HeaderLoggedOut>;

export const Default: Story = { args: {} };
