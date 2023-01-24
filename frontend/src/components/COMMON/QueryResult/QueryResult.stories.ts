import type { Meta, StoryObj } from '@storybook/react';

import mockGQLerrors from '@/mocks/mockGQLerrors';
import QueryResult from './QueryResult';

const meta: Meta<typeof QueryResult> = {
  title: 'COMMON/QueryResult',

  component: QueryResult,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof QueryResult>;

export const Default: Story = {
  args: { children: 'children', loading: false }
};

export const Loading: Story = { args: { loading: true } };

export const ShowLoading: Story = {
  args: { loading: true, showLoading: true }
};

export const Error: Story = { args: { error: mockGQLerrors } };

export const ShowError: Story = {
  args: { error: mockGQLerrors, showError: true }
};
