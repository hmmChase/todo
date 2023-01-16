import type { Meta, StoryObj } from '@storybook/react';

import Error from './Error';

const meta: Meta<typeof Error> = {
  title: 'COMMON/Error',

  component: Error,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Error>;

export const Default: Story = { args: { error: 'error' } };
