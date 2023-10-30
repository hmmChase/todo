import type { Meta, StoryObj } from '@storybook/react';

import PassResetError from './PassResetError';

const meta: Meta<typeof PassResetError> = {
  title: 'USER/PassResetError',

  component: PassResetError,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PassResetError>;

export const Default: Story = {
  args: { isTokenExpired: false, isTokenPresent: false }
};
