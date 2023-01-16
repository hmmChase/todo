import type { Meta, StoryObj } from '@storybook/react';

import HorizontalRule from './HorizontalRule';

const meta: Meta<typeof HorizontalRule> = {
  title: 'COMMON/HorizontalRule',

  component: HorizontalRule,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HorizontalRule>;

export const Default: Story = { args: {} };
