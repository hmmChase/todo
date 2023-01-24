import type { Meta, StoryObj } from '@storybook/react';

import Notice from './Notice';

const meta: Meta<typeof Notice> = {
  title: 'COMMON/Notice',

  component: Notice,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Notice>;

export const Error: Story = { args: { children: 'error', type: 'error' } };

export const Info: Story = { args: { children: 'info', type: 'info' } };

export const Success: Story = {
  args: { children: 'success', type: 'success' }
};

export const Array: Story = {
  args: {
    children: ['error 1', 'error 2', 'error 3'],
    type: 'error'
  }
};
