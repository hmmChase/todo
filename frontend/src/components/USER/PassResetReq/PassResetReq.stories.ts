import type { Meta, StoryObj } from '@storybook/react';

import PassResetReq from './PassResetReq';

const meta: Meta<typeof PassResetReq> = {
  title: 'USER/PassResetReq',

  component: PassResetReq,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PassResetReq>;

export const Default: Story = { args: {} };
