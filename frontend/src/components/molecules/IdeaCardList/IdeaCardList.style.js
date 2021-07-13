import styled from 'styled-components';
import IdeaCard from '../IdeaCard/IdeaCard';

export const IdeaCardd = styled(IdeaCard)`
  margin-top: 1rem;

  :not(:first-child) {
    margin-top: 2rem;
  }

  list-style: none;
`;

export const Ul = styled.ul`
  padding-left: 0;
  margin-bottom: 2rem;
`;
