import Left from './Left';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Left> = {
  title: 'DESIGN/ICONS/Left',

  component: Left,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Left>;

export const Default: Story = { args: {} };
