import gql from 'graphql-tag';
import { ME_IDEAS_QUERY } from '../IdeaCardContainer/IdeaCardContainer.query';

export { ME_IDEAS_QUERY };

export const CREATE_IDEA_MUTATION = gql`
  mutation CREATE_IDEA_MUTATION($content: String!) {
    createIdea(content: $content) {
      id
    }
  }
`;

export const MOCK_CREATE_IDEA_MUTATION = {
  request: {
    query: CREATE_IDEA_MUTATION
  },
  result: {
    data: {
      createIdea: [
        {
          id: '1'
        }
      ]
    }
  }
};
