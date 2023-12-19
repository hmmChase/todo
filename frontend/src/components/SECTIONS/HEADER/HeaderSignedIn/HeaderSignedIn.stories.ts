import type { Meta, StoryObj } from '@storybook/react';

import HeaderSignedIn from './HeaderSignedIn';

const meta: Meta<typeof HeaderSignedIn> = {
  title: 'SECTIONS/HEADER/HeaderSignedIn',

  component: HeaderSignedIn,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HeaderSignedIn>;

export const Default: Story = { args: {} };
