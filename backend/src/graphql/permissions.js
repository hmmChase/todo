import { shield } from 'graphql-shield';

import * as rules from './rules';

export const permissions = shield({
  Query: {
    currentUser: rules.isAuthenticated,
    idea: rules.isIdeaOwner
  }
});
