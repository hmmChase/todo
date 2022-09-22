import React from 'react';

import { render, cleanup } from '@/utils/test-utils';
import IdeaItem from './IdeaItem';

const mockIdea = {
  idea: {
    __typename: 'Idea',
    id: '1',
    createdAt: '32452424',
    content: 'idea content 1',
    author: { id: '1' }
  }
};

describe('Module Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<IdeaItem {...mockIdea} />);
  });
});
