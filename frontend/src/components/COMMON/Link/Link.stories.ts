import Link from './Link';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Link> = {
  title: 'COMMON/Link',

  component: Link,

  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = { args: { children: 'Link', href: '/' } };
