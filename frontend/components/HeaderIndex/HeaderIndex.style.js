import styled from 'styled-components';

import { signOutBtn } from '../SignOut/SignOut.style';

export const HeaderIndex = styled.div`
  display: flex;
  flex-direction: column;

  > ${signOutBtn} {
    justify-self: end;
    margin-right: 10px;
  }

  @media screen and (min-width: 600px) {
    > ${signOutBtn} {
      margin-right: 0;
    }
  }
`;

export const headerH1 = styled.h1`
  color: ${props => props.theme.color.yellow_bright};
  font-family: 'Play', sans-serif;
  font-size: 1.5rem;
  /* justify-self: start; */
  letter-spacing: 0.05rem;
  margin: 0 0 0 65px;
  text-shadow: 1px 1px ${props => props.theme.color.black};
`;
