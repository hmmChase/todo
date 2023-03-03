import HeaderUsername from './HeaderUsername';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeaderUsername> = {
  title: 'SECTIONS/HEADER/HeaderUsername',

  component: HeaderUsername,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HeaderUsername>;

export const Default: Story = { args: {} };
