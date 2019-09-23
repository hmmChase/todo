import styled from 'styled-components';

import { SignOutBtn } from '../../components/SignOutBtn/SignOutBtn.style';
import { IdeaCardForm } from '../../components/IdeaCardForm/IdeaCardForm.style';

export const HeaderMain = styled.div`
  display: grid;
  grid-template-areas:
    'top-left top-right'
    'bottom bottom';
  grid-template-columns: 1fr auto;
  align-items: center;
  flex-grow: 1;

  > h1 {
    margin: 5px 0 5px 80px;
  }

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

export const Title = styled.h1``;
