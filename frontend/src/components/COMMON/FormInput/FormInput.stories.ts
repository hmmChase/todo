import type { ChangeEvent, FocusEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import FormInput from './FormInput';

const meta: Meta<typeof FormInput> = {
  title: 'COMMON/FormInput',

  component: FormInput,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    id: 'id',
    name: 'name',
    onBlur: function (event: FocusEvent<HTMLInputElement, Element>): void {
      throw new Error('Function not implemented.');
    },
    onChange: function (event: ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
    },
    type: 'number',
    value: 'value'
  }
};
