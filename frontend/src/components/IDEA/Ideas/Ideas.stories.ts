import { ideas } from '@/mocks/idea';
import Ideas from './Ideas';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Ideas> = {
  title: 'IDEA/Ideas',

  component: Ideas,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Ideas>;

export const Default: Story = {
  args: { ideas }
};
