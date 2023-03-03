import Loading from './Loading';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Loading> = {
  title: 'COMMON/Loading',

  component: Loading,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = { args: {} };
