export const resolvers = {
  Query: {
    renderedOn: () => (typeof window === 'undefined' ? 'Server' : 'Client')
  },

  // Mutation: {},

  User: {
    color: () => 'green'
  }
};
