import styled from 'styled-components';
import IdeaCard from '../IdeaCard/IdeaCard';

export const IdeaCardd = styled(IdeaCard)`
  :not(:first-child) {
    margin-top: 2rem;
  }
`;
