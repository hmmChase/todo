import type { Meta, StoryObj } from '@storybook/react';

import Status from './Status';

const meta: Meta<typeof Status> = {
  title: 'COMMON/Status',

  component: Status,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Status>;

export const Error: Story = { args: { status: 'error' } };

export const Info: Story = { args: { status: 'info' } };

export const Success: Story = { args: { status: 'success' } };
