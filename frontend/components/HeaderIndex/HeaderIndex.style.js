import styled from 'styled-components';

import { SignOutBtn } from '../SignOutBtn/SignOutBtn.style';
import { IdeaCardForm } from '../IdeaCardForm/IdeaCardForm.style';

export const HeaderIndex = styled.div`
  align-items: center;
  display: grid;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  justify-items: center;
  margin: 0 auto;

  > ${SignOutBtn} {
    grid-area: top-right;
    justify-self: end;
    margin-right: 10px;
  }

  > ${IdeaCardForm} {
    grid-area: bottom;
  }

  @media screen and (min-width: 900px) {
    > ${SignOutBtn} {
      margin-right: 0;
    }
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.color.yellow_bright};
  font-family: 'Play', sans-serif;
  font-size: 1.5rem;
  grid-area: top-left;
  letter-spacing: 0.05rem;
  margin: 0;
  text-shadow: 1px 1px 1px ${props => props.theme.color.black};
`;
