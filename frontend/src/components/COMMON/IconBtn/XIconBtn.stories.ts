import type { Meta, StoryObj } from '@storybook/react';
import type { MouseEvent } from 'react';

import { XIconBtn } from './IconBtn';

const meta: Meta<typeof XIconBtn> = {
  title: 'COMMON/XIconBtn',

  component: XIconBtn,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof XIconBtn>;

export const Default: Story = {
  args: {
    name: 'name',
    onClick: (e: MouseEvent<HTMLButtonElement>) => {}
  }
};
