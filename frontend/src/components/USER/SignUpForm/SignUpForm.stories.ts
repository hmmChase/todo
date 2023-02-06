import SignUpForm from './SignUpForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SignUpForm> = {
  title: 'USER/SignUpForm',

  component: SignUpForm,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = { args: {} };
