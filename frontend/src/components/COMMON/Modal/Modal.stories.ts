import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'COMMON/Modal',

  component: Modal,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    close: function (): void {
      throw new Error('Function not implemented.');
    }
  }
};
