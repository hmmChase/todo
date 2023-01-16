import { createRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'COMMON/Dropdown',

  component: Dropdown,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    close: function (): void {
      throw new Error('Function not implemented.');
    },
    insideRef: createRef()
  }
};
