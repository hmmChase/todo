import styled from 'styled-components';

import { SignOutBtn } from '../../components/SignOutBtn/SignOutBtn.style';
import { IdeaCardForm } from '../../components/IdeaCardForm/IdeaCardForm.style';

export const HeaderIndex = styled.div`
  align-items: center;
  display: grid;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  justify-items: center;
  grid-template-columns: 1fr auto;

  > ${SignOutBtn} {
    grid-area: top-right;
    margin-right: 20px;
  }

  > ${IdeaCardForm} {
    grid-area: bottom;
  }

  @media screen and (min-width: 920px) {
    > ${SignOutBtn} {
      margin-right: 0;
    }
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.color.yellow_bright};
  justify-self: flex-start;
  margin: 0 0 0 80px;
  font-family: 'Play', sans-serif;
  grid-area: top-left;
  letter-spacing: 0.05rem;
  text-shadow: 1px 1px 1px ${props => props.theme.color.black};
`;
