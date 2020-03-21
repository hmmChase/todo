import styled from 'styled-components';
import IdeaCardList from '../../molecules/IdeaCardList/IdeaCardList';
import LoadMoreBtn from '../../molecules/LoadMoreBtn/LoadMoreBtn';

export const Ideas = styled.section`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 2rem; */
  /* flex-grow: 1; */
`;

export const IdeaCardListt = styled(IdeaCardList)`
  margin-bottom: 1rem;
`;

export const LoadMoreBtnn = styled(LoadMoreBtn)`
  align-self: center;
`;
