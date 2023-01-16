import type { Meta, StoryObj } from '@storybook/react';

import Left from './Left';

const meta: Meta<typeof Left> = {
  title: 'DESIGN/ICONS/Left',

  component: Left,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Left>;

export const Default: Story = { args: {} };
