import { ExpandIconBtn } from './IconBtn';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ExpandIconBtn> = {
  title: 'COMMON/ExpandIconBtn',

  component: ExpandIconBtn,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ExpandIconBtn>;

export const Default: Story = { args: { name: 'name' } };
