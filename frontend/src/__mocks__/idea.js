import * as userMocks from './user';

export const ideaItemData = {
  idea1: {
    id: '1',
    content: 'idea content 1',
    author: { ...userMocks.user.user1 }
  },

  idea2: {
    id: '2',
    content: 'idea content 2',
    author: { ...userMocks.user.user2 }
  },

  idea3: {
    id: '3',
    content: 'idea content 3',
    author: { ...userMocks.user.user3 }
  },

  idea4: {
    id: '4',
    content: 'idea content 4',
    author: { ...userMocks.user.user2 }
  },

  idea5: {
    id: '5',
    content: 'idea content 5',
    author: { ...userMocks.user.user1 }
  }
};

export const ideaListData = [
  ideaItemData.idea1,
  ideaItemData.idea2,
  ideaItemData.idea3,
  ideaItemData.idea4,
  ideaItemData.idea5
];
