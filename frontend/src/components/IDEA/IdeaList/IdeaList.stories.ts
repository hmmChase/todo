import type { Meta, StoryObj } from '@storybook/react';

import { ideas } from '@/mocks/idea';
import IdeaList from './IdeaList';

const meta: Meta<typeof IdeaList> = {
  title: 'IDEA/IdeaList',

  component: IdeaList,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaList>;

export const Default: Story = { args: { ideas: ideas } };
