import Modal from './Modal';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'COMMON/Modal',

  component: Modal,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: 'modal',
    close: () => {}
  }
};
