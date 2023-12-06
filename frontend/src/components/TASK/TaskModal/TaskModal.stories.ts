import TaskModal from './TaskModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskModal> = {
  title: 'USER/TaskModal',

  component: TaskModal,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof TaskModal>;

export const Default: Story = { args: { close: () => {} } };
