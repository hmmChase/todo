import type { Meta, StoryObj } from '@storybook/react';

import LogInForm from './LogInForm';

const meta: Meta<typeof LogInForm> = {
  title: 'USER/LogInForm',

  component: LogInForm,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof LogInForm>;

export const Default: Story = { args: {} };
