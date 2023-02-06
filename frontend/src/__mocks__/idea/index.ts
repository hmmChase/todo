import { admin, user1, user2 } from '@/mocks/user';
import type { Idea, Ideas } from '@/models/index';

export const idea1: Idea = {
  __typename: 'Idea',
  author: user1,
  content: 'idea 1',
  createdAt: new Date(),
  id: '1'
};

export const idea2: Idea = {
  __typename: 'Idea',
  author: user2,
  content: 'idea 2',
  createdAt: new Date(),
  id: '2'
};

export const idea3: Idea = {
  __typename: 'Idea',
  author: admin,
  content: 'idea 3',
  createdAt: new Date(),
  id: '3'
};

export const ideas: Ideas = [idea1, idea2, idea3];
