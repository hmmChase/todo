import styled from 'styled-components';
import { List, Button } from 'antd';

export const IdeaCardList = styled.section`
  /* display: flex; */
  /* flex-direction: column; */
  /* margin-bottom: 2rem; */
`;

export const IdeaList = styled(List)``;

export const LoadMoreBtn = styled(Button)`
  align-self: center;

  /* &:active {
    background-color: ${props => props.theme.color.green};
    border: 3px solid ${props => props.theme.color.black};
  } */
`;
