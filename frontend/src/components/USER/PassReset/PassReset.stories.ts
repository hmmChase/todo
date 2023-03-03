import PassReset from './PassReset';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PassReset> = {
  title: 'USER/PassReset',

  component: PassReset,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PassReset>;

export const Default: Story = { args: { passResetToken: 'passResetToken' } };
