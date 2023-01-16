import type { Meta, StoryObj } from '@storybook/react';

import Field from './Field';

const meta: Meta<typeof Field> = {
  title: 'COMMON/Field',

  component: Field,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = { args: { name: 'name', type: 'text' } };
