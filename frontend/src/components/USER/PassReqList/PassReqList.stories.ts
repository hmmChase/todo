import PassReqList from './PassReqList';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PassReqList> = {
  title: 'USER/PassReqList',

  component: PassReqList,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PassReqList>;

export const Default: Story = { args: {} };
