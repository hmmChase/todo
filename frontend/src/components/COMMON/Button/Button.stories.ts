import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'COMMON/Button',

  component: Button,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: 'Button' } };

export const Loading: Story = { args: { children: 'Button', loading: true } };

export const Disabled: Story = { args: { children: 'Button', disabled: true } };

export const Alt: Story = { args: { alt: true, children: 'Button' } };

export const AltLoading: Story = {
  args: { alt: true, children: 'Button', loading: true }
};
