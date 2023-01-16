import type { Meta, StoryObj } from '@storybook/react';

import QueryResult from './QueryResult';

const meta: Meta<typeof QueryResult> = {
  title: 'COMMON/QueryResult',

  component: QueryResult,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof QueryResult>;

export const Default: Story = { args: { loading: false } };
