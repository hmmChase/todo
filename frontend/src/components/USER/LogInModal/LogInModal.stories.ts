import type { Meta, StoryObj } from '@storybook/react';

import LogInModal from './LogInModal';

const meta: Meta<typeof LogInModal> = {
  title: 'USER/LogInModal',

  component: LogInModal,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof LogInModal>;

export const Default: Story = { args: { close: () => {} } };
