import styled from 'styled-components';

import { SignOutBtn } from '../../components/SignOutBtn/SignOutBtn.style';

export const HeaderDetail = styled.div`
  display: flex;
  align-items: center;
  /* justify-items: center; */

  > ${SignOutBtn} {
    /* align-self: flex-end; */
    /* grid-area: right; */
    /* margin-right: 20px; */
  }

  @media screen and (min-width: 920px) {
    > ${SignOutBtn} {
      /* margin-right: 0; */
    }
  }
`;

export const Title = styled.h1`
  font-size: 0.8rem;
`;
