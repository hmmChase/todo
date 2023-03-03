import Expand from './Expand';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Expand> = {
  title: 'DESIGN/ICONS/Expand',

  component: Expand,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Expand>;

export const Default: Story = { args: {} };
