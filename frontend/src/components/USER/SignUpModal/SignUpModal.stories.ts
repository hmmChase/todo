import type { Meta, StoryObj } from '@storybook/react';

import SignUpModal from './SignUpModal';

const meta: Meta<typeof SignUpModal> = {
  title: 'USER/SignUpModal',

  component: SignUpModal,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SignUpModal>;

export const Default: Story = { args: { close: () => {} } };
