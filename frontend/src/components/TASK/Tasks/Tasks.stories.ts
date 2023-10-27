import type { Meta, StoryObj } from '@storybook/react';

import { tasks } from '@/mocks/task';
import Tasks from './Tasks';

const meta: Meta<typeof Tasks> = {
  title: 'TASK/Tasks',

  component: Tasks,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Tasks>;

export const Default: Story = {
  args: { tasks }
};
