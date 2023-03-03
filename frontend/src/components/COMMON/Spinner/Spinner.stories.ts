import Spinner from './Spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'COMMON/Spinner',

  component: Spinner,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: {} };
