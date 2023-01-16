import type { Meta, StoryObj } from '@storybook/react';

import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'COMMON/Loading',

  component: Loading,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = { args: {} };
