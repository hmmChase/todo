import styled from 'styled-components';
import IdeaCardList from '../../molecules/IdeaCardList/IdeaCardList';
import ShowMoreBtn from '../../molecules/ShowMoreBtn/ShowMoreBtn';

export const Ideas = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  /* flex-grow: 1; */
`;

export const IdeaCardListt = styled(IdeaCardList)`
  margin-bottom: 2rem;
`;

export const ShowMoreBtnn = styled(ShowMoreBtn)`
  align-self: center;
`;
