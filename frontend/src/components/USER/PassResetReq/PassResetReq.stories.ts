import PassResetReq from './PassResetReq';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PassResetReq> = {
  title: 'USER/PassResetReq',

  component: PassResetReq,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PassResetReq>;

export const Default: Story = { args: {} };
