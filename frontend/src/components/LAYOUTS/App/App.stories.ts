import App from './App';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof App> = {
  title: 'LAYOUTS/App',

  component: App,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  args: { description: 'description', title: 'title' }
};
