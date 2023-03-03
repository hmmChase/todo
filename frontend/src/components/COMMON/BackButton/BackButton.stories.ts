import BackButton from './BackButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BackButton> = {
  title: 'COMMON/BackButton',

  component: BackButton,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default: Story = { args: {} };
