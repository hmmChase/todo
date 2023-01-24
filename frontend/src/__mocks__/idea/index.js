import * as user from '@/mocks/user';

export const idea = {
  idea1: {
    __typename: 'Idea',
    id: '1',
    createdAt: '32452424',
    content: 'idea content 1',
    author: { id: user.user.user1.id }
  },

  idea2: {
    __typename: 'Idea',
    id: '2',
    createdAt: '32452424',
    content: 'idea content 2',
    author: { id: user.user.user2.id }
  },

  idea3: {
    __typename: 'Idea',
    id: '3',
    createdAt: '32452424',
    content: 'idea content 3',
    author: { id: user.user.user3.id }
  },

  idea4: {
    __typename: 'Idea',
    id: '4',
    createdAt: '32452424',
    content: 'idea content 4',
    author: { id: user.user.user2.id }
  },

  idea5: {
    __typename: 'Idea',
    id: '5',
    createdAt: '32452424',
    content: 'idea content 5',
    author: { id: user.user.user1.id }
  }
};

export const ideas = [
  idea.idea1,
  idea.idea2,
  idea.idea3,
  idea.idea4,
  idea.idea5
];
