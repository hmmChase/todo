import type { Meta, StoryObj } from '@storybook/react';

import SignUpForm from './SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'USER/SignUpForm',

  component: SignUpForm,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = { args: {} };
