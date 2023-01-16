import type { Meta, StoryObj } from '@storybook/react';

import IdeaDetailIcon from './IdeaDetailIcon';

const meta: Meta<typeof IdeaDetailIcon> = {
  title: 'IDEA/DETAIL/IdeaDetailIcon',

  component: IdeaDetailIcon,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof IdeaDetailIcon>;

export const Default: Story = { args: { ideaId: 'ideaId' } };
