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
