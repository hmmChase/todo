import Header from './Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'SECTIONS/HEADER/Header',

  component: Header,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = { args: { isLoggedIn: true } };

export const LoggedOut: Story = { args: { isLoggedIn: false } };
