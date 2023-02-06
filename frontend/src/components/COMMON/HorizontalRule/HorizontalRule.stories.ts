import HorizontalRule from './HorizontalRule';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HorizontalRule> = {
  title: 'COMMON/HorizontalRule',

  component: HorizontalRule,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HorizontalRule>;

export const Default: Story = { args: {} };
